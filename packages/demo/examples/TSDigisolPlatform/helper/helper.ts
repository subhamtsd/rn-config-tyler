/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_ENDPOINT } from "../../../../../../../config/endpoint";
export const getSchema = async (roleKey, userId) => {
  const res = await fetch(
    // `https://run.mocky.io/v3/c03ca82f-c15f-4bc3-beef-4f64d297654d`,
    `${SERVER_ENDPOINT}v1/schema/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // TODO : REMOVE this hardcoding
        userId: userId,
        roleKey: roleKey,
      }),
    }
  );

  const resJSON = await res.json();
  console.log("resJson from getSchema : : : : ----> ", await resJSON);
  return await resJSON;
};

export const removeKeyFromUrl = async (
  urlWithKeyParameter,
  regressExpression
) => {
  return urlWithKeyParameter.replace(regressExpression, "");
};

export const getEnum = async (dropdownURL, method) => {
  console.log("dropdownURL : : : ", dropdownURL);
  console.log("method : : : ", method);
  const apiResponse = await fetch(
    dropdownURL,
    // let apiResponse: any = await fetch("/transaction-web/v1/schema/",

    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: "pvaranasi",
        roleKey: 1,
      }),
    }
  );
  return apiResponse.json();
};

export const prepareSchema = async (schemaList) => {
  console.log("SchemaLIST in prepareSchema ::: ", schemaList);

  const transformProperties = async (schema) => {
    console.log("schema Hello ONE: : : ", schema);

    for (const field in schema.properties) {
      if (schema.properties[field].type === "array") {
        console.log("dropDown without Field : : : ", schema.properties[field]);
        await transformProperties(schema.properties[field].items);
      } else if (schema.properties[field]["displayType"] === "dropdown") {
        console.log("dropDown Field : : : ", schema.properties[field]);

        const field_obj = schema.properties[field];
        // TODO :: RM HARDCODING BELOW, REMOVE IT
        if (!field_obj?.dependency?.length) {
          const dropdownEnum = await getEnum(
            // '/transaction-web/v1/device/list/' || field_obj['dropdownLoadApiURL'],
            `${SERVER_ENDPOINT}${field_obj["dropdownLoadApiURL"]}`,
            field_obj["dropdownLoadApiMethod"]
          );

          const Enum = [],
            enumNames = [];
          for (const select of dropdownEnum.response) {
            Enum.push(select[dropdownEnum?.filedValue || field]);
            enumNames.push(select[dropdownEnum?.displayValue || field]);
          }
          if (schema.uischema == undefined) {
            schema.uischema = {};
          }
          if (schema.uischema[field] == undefined) {
            schema.uischema[field] = {};
          }
          schema.uischema[field]["ui:enum"] = Enum;
          schema.uischema[field]["ui:enumNames"] = enumNames;
          console.log("NNNN");
          console.log(
            schema.uischema[field]["ui:enum"],
            "----",
            schema.uischema[field]["ui:enumNames"]
          );
        }
      }
    }
  };

  for (const schemaName in schemaList) {
    const schema = schemaList[schemaName];
    console.log("schema in forLoop : : : ", schema);
    if (schema.properties) {
      await transformProperties(schema);
    }
  }

  console.log("schemmaList : : :: : ", schemaList);

  return schemaList;
};

// TODO: Move the data to Helper File
export const parseFormData = (data) => {
  console.log("parseFormData -----------> in fnc ", data);
  Object.keys(data).map((key) => {
    if (data[key] === "true") {
      data[key] = true;
    } else if (data[key] === "false") {
      data[key] = false;
    }
  });
  console.log("data after formating :::::: ", data);
  return data;
};

export const formCleanProperty = (
  propertyName,
  newFormData,
  newUiSchema,
  formSchema
) => {
  if (newFormData[propertyName]) {
    formSchema?.["properties"]?.[
      propertyName
    ]?.nextDepended?.dependentField?.forEach((property) => {
      formCleanProperty(
        property.fieldName,
        newFormData,
        newUiSchema,
        formSchema
      );
    });
  }
  if (newUiSchema[propertyName] == undefined) {
    newUiSchema[propertyName] = {};
  }
  delete newFormData[propertyName];
  if (formSchema?.["properties"]?.[propertyName]?.displayType == "dropdown") {
    delete newUiSchema[propertyName]["ui:enum"];
    delete newUiSchema[propertyName]["ui:enumNames"];
  }
  if (formSchema?.["properties"]?.[propertyName]?.format == "date") {
    delete newUiSchema[propertyName]["ui:minDate"];
    delete newUiSchema[propertyName]["ui:maxDate"];
  }
  newUiSchema[propertyName]["ui:disabled"] = true;
};

export const formFetchData = async (keyName, body, formSchema) => {
  const res = await fetch(
    `${SERVER_ENDPOINT}${formSchema?.["properties"]?.[keyName]?.dropdownLoadApiURL}`,
    {
      method: formSchema?.["properties"]?.[keyName]?.dropdownLoadApiMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const resJSON = await res.json();
  if (formSchema?.["properties"]?.[keyName]?.displayType == "dropdown") {
    const value = [];
    const label = [];
    for (const data of resJSON.response) {
      value.push(data[resJSON?.filedValue || keyName]);
      label.push(data[resJSON.displayValue]);
    }
    return { enum: value, enumName: label };
  } else if (formSchema["properties"][keyName]?.format == "date") {
    return {
      minDate: resJSON.response?.[0]?.startDate,
      maxDate: resJSON.response?.[resJSON.response.length - 1]?.startDate,
    };
  } else if (formSchema["properties"][keyName]?.format == "readOnly") {
    return resJSON.response[0][resJSON.displayValue];
  }
};

export const formDependency = async (
  name,
  newFormData,
  newUiSchema,
  formSchema
) => {
  if (
    formSchema?.["properties"]?.[name]?.nextDepended?.dependentField?.length
  ) {
    await Promise.all(
      formSchema?.["properties"]?.[name]?.nextDepended?.dependentField?.map(
        async (property) => {
          let flag = true;
          const body = {};
          formSchema?.["properties"]?.[property.fieldName]?.dependency?.forEach(
            (propertyName) => {
              if (newFormData[propertyName] == undefined) {
                flag = false;
                return;
              }
              body[propertyName] = newFormData[propertyName];
            }
          );
          if (newUiSchema[property.fieldName] == undefined) {
            newUiSchema[property.fieldName] = {};
          }
          if (flag) {
            const data = await formFetchData(
              property.fieldName,
              body,
              formSchema
            );
            if (
              formSchema?.["properties"]?.[property.fieldName]?.displayType ==
              "dropdown"
            ) {
              newUiSchema[property.fieldName]["ui:enum"] = data.enum;
              newUiSchema[property.fieldName]["ui:enumNames"] = data.enumName;
            }
            if (
              formSchema?.["properties"]?.[property.fieldName]?.format == "date"
            ) {
              newUiSchema[property.fieldName]["ui:minDate"] = data["minDate"];
              newUiSchema[property.fieldName]["ui:maxDate"] = data["maxDate"];
            }
            if (
              formSchema?.["properties"]?.[property.fieldName]?.format ==
              "readOnly"
            ) {
              newFormData[property.fieldName] = data;
            }
            newUiSchema[property.fieldName]["ui:disabled"] = false;
          } else {
            newUiSchema[property.fieldName]["ui:disabled"] = true;
          }
        }
      )
    );
  }
};
