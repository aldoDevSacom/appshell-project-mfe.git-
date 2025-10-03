import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgClass,
  NgForOf,
  __decorate,
  init_common,
  init_core,
  init_tslib_es6
} from "./chunk-2I7XQ46T.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.html
var metrics_grid_default;
var init_metrics_grid = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.html"() {
    metrics_grid_default = '<div class="flex flex-wrap gap-6 pb-8">\n  <div\n    *ngFor="let metric of metrics; trackBy: metricTrack"\n    class="flex min-w-[180px] flex-1 flex-col gap-3 rounded-3xl bg-white/60 p-6 card-shadow backdrop-blur-sm dark:bg-slate-900/70">\n    <p class="text-lg font-semibold leading-normal text-slate-700 dark:text-slate-200">{{ metric.title }}</p>\n    <p class="text-4xl font-black leading-tight tracking-tighter text-slate-800 dark:text-white">{{ metric.value }}</p>\n    <p class="text-lg font-bold leading-normal" [ngClass]="trendClass(metric.trendColor)">{{ metric.trend }}</p>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.css
var metrics_grid_default2;
var init_metrics_grid2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.css"() {
    metrics_grid_default2 = "/* apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.css */\n/*# sourceMappingURL=metrics-grid.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.ts
var MetricsGrid;
var init_metrics_grid3 = __esm({
  "apps/mfe-dashboard/src/app/components/metrics-grid/metrics-grid.ts"() {
    "use strict";
    init_tslib_es6();
    init_metrics_grid();
    init_metrics_grid2();
    init_core();
    init_common();
    MetricsGrid = class MetricsGrid2 {
      metrics = [];
      trendClass(trend) {
        return trend === "positive" ? "text-green-500" : "text-red-500";
      }
      metricTrack = (_, metric) => metric.title;
      static propDecorators = {
        metrics: [{ type: Input, args: [{ required: true }] }]
      };
    };
    MetricsGrid = __decorate([
      Component({
        selector: "app-metrics-grid",
        standalone: true,
        imports: [NgForOf, NgClass],
        template: metrics_grid_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [metrics_grid_default2]
      })
    ], MetricsGrid);
  }
});

export {
  MetricsGrid,
  init_metrics_grid3 as init_metrics_grid
};
//# sourceMappingURL=chunk-PDAPZAY3.js.map
