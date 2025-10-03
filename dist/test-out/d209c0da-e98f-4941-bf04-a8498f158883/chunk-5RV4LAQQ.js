import {
  MetricsGrid,
  init_metrics_grid
} from "./chunk-PDAPZAY3.js";
import {
  OrdersTable,
  init_orders_table
} from "./chunk-PGTZUGMP.js";
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

// angular:jit:template:apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.html
var dashboard_content_default;
var init_dashboard_content = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.html"() {
    dashboard_content_default = '<section class="flex flex-col gap-8">\n  <div class="flex flex-wrap items-center justify-between gap-3">\n    <p class="min-w-72 text-4xl font-extrabold leading-tight tracking-tight text-slate-800 dark:text-white">\n      Dashboard\n    </p>\n  </div>\n\n  <app-metrics-grid [metrics]="metrics"></app-metrics-grid>\n\n  <app-orders-table [orders]="orders"></app-orders-table>\n</section>\n';
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.css
var dashboard_content_default2;
var init_dashboard_content2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.css"() {
    dashboard_content_default2 = "/* apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.css */\n/*# sourceMappingURL=dashboard-content.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.ts
var DashboardContentComponent;
var init_dashboard_content3 = __esm({
  "apps/mfe-dashboard/src/app/components/dashboard-content/dashboard-content.ts"() {
    "use strict";
    init_tslib_es6();
    init_dashboard_content();
    init_dashboard_content2();
    init_core();
    init_metrics_grid();
    init_orders_table();
    DashboardContentComponent = class DashboardContentComponent2 {
      metrics = [
        { title: "Ordenes Abiertas", value: "35", trend: "+10%", trendColor: "positive" },
        { title: "Ordenes de Hoy", value: "8", trend: "-5%", trendColor: "negative" },
        { title: "Tiempo Promedio", value: "3.2 h", trend: "+2%", trendColor: "positive" }
      ];
      orders = [
        { customer: "MALLAS ORI\xD3N-FUNDADORES", status: "Iniciada", statusVariant: "gradient", folio: "# 47856890", date: "12-09-2025" },
        { customer: "FUMICOUNTRY AMBIENTAL SAS FUMICOUNTRY AMBIENTAL SAS-BOGOT\xC1", status: "Completada", statusVariant: "neutral", folio: "# 09875432", date: "12-09-2025" },
        { customer: "GR\xDAAS ECON\xD3MICAS DELTA-NI\xD1OS HEROES", status: "Rechazada", statusVariant: "neutral", folio: "# 67894321", date: "12-09-2025" },
        { customer: "Spring Launch", status: "Iniciada", statusVariant: "gradient", folio: "# 12340987", date: "12-09-2025" },
        { customer: "Year-End Clearance", status: "Completada", statusVariant: "neutral", folio: "# 92018476", date: "12-09-2025" }
      ];
    };
    DashboardContentComponent = __decorate([
      Component({
        selector: "app-dashboard-content",
        standalone: true,
        imports: [MetricsGrid, OrdersTable],
        template: dashboard_content_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [dashboard_content_default2]
      })
    ], DashboardContentComponent);
  }
});

export {
  DashboardContentComponent,
  init_dashboard_content3 as init_dashboard_content
};
//# sourceMappingURL=chunk-5RV4LAQQ.js.map
