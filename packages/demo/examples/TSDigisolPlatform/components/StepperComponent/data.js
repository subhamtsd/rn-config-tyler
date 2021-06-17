export const data = [
  {
    isRoot: true,
    labelID: "s1",
    name: "Step 1",
    event: [
      {
        onPress: {
          style: {
            activeColor: "green",
            borderColor: "green",
            borderWidth: "1",
            disabledColor: "grey",
            isDisabled: false,
          },
          layoutToRender: {
            layoutName: "",
            layoutApiEndpoint: "",
            layoutApiMethod: "",
            layoutApiRequestBody: {
              module: "",
              tab: "",
              action: "",
            },
          },
          populateFormField: [
            {
              formName: "",
              fieldName: "",
              fieldValue: "",
            },
          ],
        },
      },
    ],
    dependent: {
      hasDependent: false,
      dependentList: [],
    },
    nextActive: {
      hasNextActiveSteps: true,
      nextActiveSteps: ["Step 2", "Step 3"],
    },
    prevActive: {
      hasprevActiveSteps: false,
      prevActiveSteps: [],
    },
  },
  {
    labelID: "s2",
    name: "Step 2",
    event: [
      {
        onPress: {
          style: {
            activeColor: "orange",
            borderColor: "blue",
            borderWidth: "blue",
            disabledColor: "grey",
            isDisabled: false,
          },
          layoutToRender: {
            layoutName: "",
            layoutApiEndpoint: "",
            layoutApiMethod: "",
            layoutApiRequestBody: {
              module: "",
              tab: "",
              action: "",
            },
          },
          populateFormField: [
            {
              fieldName: "",
              fieldValue: "",
            },
          ],
        },
      },
    ],
    dependent: {
      hasDependent: true,
      dependentList: [
        {
          labelID: "s2.1",
          name: "Step 2.1",
          event: [
            {
              onPress: {
                style: {
                  activeColor: "orange",
                  borderColor: "blue",
                  borderWidth: "blue",
                  disabledColor: "grey",
                  isDisabled: false,
                },
                layoutToRender: {
                  layoutName: "",
                  layoutApiEndpoint: "",
                  layoutApiMethod: "",
                  layoutApiRequestBody: {
                    module: "",
                    tab: "",
                    action: "",
                  },
                },
                populateFormField: [
                  {
                    fieldName: "",
                    fieldValue: "",
                  },
                ],
              },
            },
          ],
          dependent: {
            hasDependent: true,
            dependentList: [
              {
                labelID: "s2.1.1",
                name: "Step 2.1.1",
                event: [
                  {
                    onPress: {
                      style: {
                        activeColor: "blue",
                        borderColor: "blue",
                        borderWidth: "blue",
                        disabledColor: "grey",
                        isDisabled: false,
                      },
                      layoutToRender: {
                        layoutName: "",
                        layoutApiEndpoint: "",
                        layoutApiMethod: "",
                        layoutApiRequestBody: {
                          module: "",
                          tab: "",
                          action: "",
                        },
                      },
                      populateFormField: [
                        {
                          fieldName: "",
                          fieldValue: "",
                        },
                      ],
                    },
                  },
                ],
                dependent: {
                  hasDependent: false,
                  dependentList: [],
                },
                nextActive: {
                  hasNextActiveSteps: true,
                  nextActiveSteps: ["Step 2.2", "Step 3"],
                },
                prevActive: {
                  hasprevActiveSteps: false,
                  prevActiveSteps: [],
                },
              },
              {
                labelID: "s2.1.2",
                name: "Step 2.1.2",
                event: [
                  {
                    onPress: {
                      style: {
                        activeColor: "blue",
                        borderColor: "blue",
                        borderWidth: "blue",
                        disabledColor: "grey",
                        isDisabled: true,
                      },
                      layoutToRender: {
                        layoutName: "",
                        layoutApiEndpoint: "",
                        layoutApiMethod: "",
                        layoutApiRequestBody: {
                          module: "",
                          tab: "",
                          action: "",
                        },
                      },
                      populateFormField: [
                        {
                          fieldName: "",
                          fieldValue: "",
                        },
                      ],
                    },
                  },
                ],
                dependent: {
                  hasDependent: false,
                  dependentList: [],
                },
                nextActive: {
                  hasNextActiveSteps: false,
                  nextActiveSteps: [],
                },
              },
            ],
          },
          nextActive: {
            hasNextActiveSteps: true,
            nextActiveSteps: ["Step 2.2", "Step 3"],
          },
          prevActive: {
            hasprevActiveSteps: false,
            prevActiveSteps: [],
          },
        },
        {
          labelID: "s2.2",
          name: "Step 2.2",
          event: [
            {
              onPress: {
                style: {
                  activeColor: "blue",
                  borderColor: "blue",
                  borderWidth: "blue",
                  disabledColor: "grey",
                  isDisabled: true,
                },
                layoutToRender: {
                  layoutName: "",
                  layoutApiEndpoint: "",
                  layoutApiMethod: "",
                  layoutApiRequestBody: {
                    module: "",
                    tab: "",
                    action: "",
                  },
                },
                populateFormField: [
                  {
                    fieldName: "",
                    fieldValue: "",
                  },
                ],
              },
            },
          ],
          dependent: {
            hasDependent: false,
            dependentList: [],
          },
          nextActive: {
            hasNextActiveSteps: false,
            nextActiveSteps: [],
          },
        },
      ],
    },
    nextActive: {
      hasNextActiveSteps: true,
      nextActiveSteps: ["Step 2", "Step 3"],
    },
    prevActive: {
      hasprevActiveSteps: true,
      prevActiveSteps: ["Step 1"],
    },
  },
  {
    labelID: "s3",
    name: "Step 3",
    event: [
      {
        onPress: {
          style: {
            activeColor: "orange",
            borderColor: "blue",
            borderWidth: "blue",
            disabledColor: "grey",
            isDisabled: false,
          },
          layoutToRender: {
            layoutName: "",
            layoutApiEndpoint: "",
            layoutApiMethod: "",
            layoutApiRequestBody: {
              module: "",
              tab: "",
              action: "",
            },
          },
          populateFormField: [
            {
              fieldName: "",
              fieldValue: "",
            },
          ],
        },
      },
    ],
    dependent: {
      hasDependent: false,
      dependentList: [],
    },
    nextActive: {
      hasNextActiveSteps: true,
      nextActiveSteps: ["Step 4"],
    },
    prevActive: {
      hasprevActiveSteps: true,
      prevActiveSteps: ["Step 2", "Step 1"],
    },
  },
  {
    labelID: "s4",
    name: "Step 4",
    event: [
      {
        onPress: {
          style: {
            activeColor: "orange",
            borderColor: "blue",
            borderWidth: "blue",
            disabledColor: "grey",
            isDisabled: true,
          },
          layoutToRender: {
            layoutName: "",
            layoutApiEndpoint: "",
            layoutApiMethod: "",
            layoutApiRequestBody: {
              module: "",
              tab: "",
              action: "",
            },
          },
          populateFormField: [
            {
              fieldName: "",
              fieldValue: "",
            },
          ],
        },
      },
    ],
    dependent: {
      hasDependent: false,
      dependentList: [],
    },
    nextActive: {
      hasNextActiveSteps: false,
      nextActiveSteps: [],
    },
    prevActive: {
      hasprevActiveSteps: true,
      prevActiveSteps: ["Step 3"],
    },
  },
];
