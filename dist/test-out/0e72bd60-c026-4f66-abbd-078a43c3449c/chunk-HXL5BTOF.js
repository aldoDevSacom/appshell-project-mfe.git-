import {
  DashboardContentComponent,
  init_dashboard_content
} from "./chunk-5RV4LAQQ.js";
import {
  ChangeDetectionStrategy,
  Component,
  __decorate,
  init_core,
  init_tslib_es6
} from "./chunk-2I7XQ46T.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.html
var dashboard_layout_default;
var init_dashboard_layout = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.html"() {
    dashboard_layout_default = "<app-dashboard-content></app-dashboard-content>\n";
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.css
var dashboard_layout_default2;
var init_dashboard_layout2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.css"() {
    dashboard_layout_default2 = "/* apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.css */\n/*# sourceMappingURL=dashboard-layout.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts
var DashboardLayout;
var init_dashboard_layout3 = __esm({
  "apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.ts"() {
    "use strict";
    init_tslib_es6();
    init_dashboard_layout();
    init_dashboard_layout2();
    init_core();
    init_dashboard_content();
    DashboardLayout = class DashboardLayout2 {
    };
    DashboardLayout = __decorate([
      Component({
        selector: "app-dashboard-layout",
        standalone: true,
        imports: [DashboardContentComponent],
        template: dashboard_layout_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [dashboard_layout_default2]
      })
    ], DashboardLayout);
  }
});

export {
  DashboardLayout,
  init_dashboard_layout3 as init_dashboard_layout
};
//# sourceMappingURL=chunk-HXL5BTOF.js.map
