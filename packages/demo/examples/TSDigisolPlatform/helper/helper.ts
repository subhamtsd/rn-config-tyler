/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getSchema = async (roleKey: string, userId: string) => {
  const res = await fetch(
    // `https://run.mocky.io/v3/c03ca82f-c15f-4bc3-beef-4f64d297654d`,
    "http://localhost:8080/transaction-web/v1/schema/",
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
  urlWithKeyParameter: string,
  regressExpression
) => {
  return urlWithKeyParameter.replace(regressExpression, "");
};

export const getEnum = async (dropdownURL: any, method: any) => {
  console.log("dropdownURL : : : ", dropdownURL);
  console.log("method : : : ", method);
  const apiResponse: any = await fetch(
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

export const prepareSchema = async (schemaList: any) => {
  const transformProperties = async (schema: { properties: any }) => {
    console.log("schema : : : ", schema);

    for (const field in schema.properties) {
      if (schema.properties[field].type === "object") {
        console.log("dropDown without Field : : : ", schema.properties[field]);
        await transformProperties(schema.properties[field]);
      } else if (schema.properties[field]["displayType"] === "dropdown") {
        console.log("dropDown Field : : : ", schema.properties[field]);

        const field_obj = schema.properties[field];

        if (field_obj.type === "array" && field_obj.items) {
          //  handle array type
          await transformProperties(field_obj);
        } else {
          // TODO :: RM HARDCODING BELOW, REMOVE IT
          const dropdownEnum = await getEnum(
            // '/transaction-web/v1/device/list/' || field_obj['dropdownLoadApiURL'],
            `http://localhost:8080/transaction-web/${field_obj["dropdownLoadApiURL"]}`,
            field_obj["dropdownLoadApiMethod"]
          );
          const Enum = [],
            enumNames = [];
          for (const select of dropdownEnum.response) {
            Enum.push(select[field]);
            enumNames.push(select[field]);
          }
          schema.properties[field]["enum"] = Enum;
          schema.properties[field]["enumNames"] = enumNames;
          console.log("NNNN");
          console.log(
            schema.properties[field]["enum"],
            "----",
            schema.properties[field]["enumNames"]
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