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
} from "./chunk-XVQEXZI5.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:apps/mfe-dashboard/src/app/components/orders-table/orders-table.html
var orders_table_default;
var init_orders_table = __esm({
  "angular:jit:template:apps/mfe-dashboard/src/app/components/orders-table/orders-table.html"() {
    orders_table_default = '<div class="rounded-3xl bg-white/60 px-4 py-4 card-shadow backdrop-blur-sm dark:bg-slate-900/70">\n  <div class="overflow-hidden rounded-2xl">\n    <table class="table-fixed-wrap w-full">\n      <colgroup>\n        <col class="w-1/2">\n        <col class="w-1/6">\n        <col class="w-1/6">\n        <col class="w-1/6">\n      </colgroup>\n      <thead>\n        <tr class="bg-transparent">\n          <th class="px-6 py-4 text-left text-base font-semibold leading-normal text-slate-800 dark:text-slate-100">\n            Cliente\n          </th>\n          <th class="px-6 py-4 text-center text-base font-semibold leading-normal text-slate-800 dark:text-slate-100">\n            Estatus\n          </th>\n          <th class="px-6 py-4 text-center text-base font-semibold leading-normal text-slate-800 dark:text-slate-100">\n            Folio\n          </th>\n          <th class="px-6 py-4 text-center text-base font-semibold leading-normal text-slate-800 dark:text-slate-100">\n            Fecha\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor="let order of orders; trackBy: trackOrder" class="border-t border-slate-200/50 dark:border-slate-700/60">\n          <td class="px-6 py-3 text-left text-base font-normal leading-normal text-slate-700 dark:text-slate-200">\n            {{ order.customer }}\n          </td>\n          <td class="px-6 py-3 text-center">\n            <button\n              class="flex h-10 w-full min-w-[84px] max-w-[220px] items-center justify-center overflow-hidden rounded-full px-4 text-base font-medium leading-normal transition" type="button"\n              [ngClass]="statusClasses(order)">\n              <span class="truncate">{{ order.status }}</span>\n            </button>\n          </td>\n          <td class="px-6 py-3 text-center text-base font-normal leading-normal text-slate-500 dark:text-slate-400">\n            {{ order.folio }}\n          </td>\n          <td class="px-6 py-3 text-center text-base font-normal leading-normal text-slate-600 dark:text-slate-300">\n            {{ order.date }}\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:apps/mfe-dashboard/src/app/components/orders-table/orders-table.css
var orders_table_default2;
var init_orders_table2 = __esm({
  "angular:jit:style:apps/mfe-dashboard/src/app/components/orders-table/orders-table.css"() {
    orders_table_default2 = "/* apps/mfe-dashboard/src/app/components/orders-table/orders-table.css */\n/*# sourceMappingURL=orders-table.css.map */\n";
  }
});

// apps/mfe-dashboard/src/app/components/orders-table/orders-table.ts
var OrdersTable;
var init_orders_table3 = __esm({
  "apps/mfe-dashboard/src/app/components/orders-table/orders-table.ts"() {
    "use strict";
    init_tslib_es6();
    init_orders_table();
    init_orders_table2();
    init_core();
    init_common();
    OrdersTable = class OrdersTable2 {
      orders = [];
      statusClasses(order) {
        if (order.statusVariant === "gradient") {
          return "animated-gradient text-white shadow-lg";
        }
        return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100";
      }
      trackOrder = (_, order) => order.folio;
      static propDecorators = {
        orders: [{ type: Input, args: [{ required: true }] }]
      };
    };
    OrdersTable = __decorate([
      Component({
        selector: "app-orders-table",
        standalone: true,
        imports: [NgForOf, NgClass],
        template: orders_table_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [orders_table_default2]
      })
    ], OrdersTable);
  }
});

export {
  OrdersTable,
  init_orders_table3 as init_orders_table
};
//# sourceMappingURL=chunk-4CNQZCCT.js.map
