# RN Config Tyler (Routing Kit)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/applerdotxyz/rn-config-tyler)


![Beta](https://github.com/applerdotxyz/rn-config-tyler/workflows/Beta/badge.svg)

![E2E](https://github.com/applerdotxyz/rn-config-tyler/workflows/E2E/badge.svg)

--- 
<p align="center">
  
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/applerdotxyz/rn-config-tyler">

  <img alt="GitHub" src="https://img.shields.io/github/license/applerdotxyz/rn-config-tyler">
</p>

---



### Routing by configuration
- enables multiple rendering areas (like angular routier-outlet)
- works with `react` and `react-native`
- ability to jump to any route by switching config
- All JSON based app configuration (easier to change workflows)

### getting started
1. Create the initial page layout config, which is also called `layoutConfig` or `appConfig`. Have a look at the examples folder `layout` files to figureout how to write a layoutConfig. At minimal it needs to have an appConfig JSON to be declared and exported out of that file.

```


export const appConfig = {
  /// 1st layout
  componentsSet,
  links,
  layout: {
    // row no
    "1container": {
      rowConfig: {
        rowSize: 1,
        rowStyle: rowStyle,
      },
      // col no
      "11leftNavCol": {
        layout: {
          colConfig: {
            colSize: 2,
          },
          "11leftNavHeaderRow": {
            // row no
            rowConfig: {
              rowSize: 0.5,
              rowStyle: rowStyle,
            },
            leftNavHeader: {
              // col no
              colSize: 1,
              idx: "Home",
              label: "leftNavHeader",
              colStyle: { borderWidth: 1, height: "10vh" },
            },
          },

        }
      }
    }
  }
}

```


### Route defination
Changes to initial screen could be passed by calling `setLayoutConfig` and passing it a change/delta JSON, which contains the change that you want to happen to original config (`appConfig`).
#### format 1 - Pure JSON objects
```

// expanded (non-dottend notation) route config
routes.routeThree = {
  // row no
  "1container": {
    "11leftNavCol": {
      layout: {
        colConfig: {
          colStyle: { display: "block" },
        },
      },
      // layout: null,
    },
    // col no
    "12bodyCol": {
      layout: {
        colConfig: {
          colSize: 18,
        },
        "122bodyContentRow": {
          bodyContent: {
            idx: "Home",
          },
        },
      },
    },
  },
};

```
#### format 2 - Dotted JSON objects

Please note that initial `appConfig` can obnly be in expanded format, not in dotted format
Rule 2 - You could not use `.` in your keys when you use dotted syntax. e.g. `1.container` as `key` is not usable with this method. 
```
// dotted notation config route
routes.routeTwo = {
  "1container.11leftNavCol.layout.colConfig.colStyle.display": "none",
  "1container.12bodyCol.layout.colConfig.colSize": 11,
  "1container.12bodyCol.layout.121bodyHeaderRow.bodyHeader.idx": "ActionComp",
  "1container.12bodyCol.layout.122bodyContentRow.bodyContent.idx": "RandomPic",
  "1container.12bodyCol.layout.123bodyFooterRow.bodyFooter.idx": "About",
};

```