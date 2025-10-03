// apps/mfe-marketing/src/app/remote-entry/remote-entry.component.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy3, Component as Component3 } from "@angular/core";
import { NgFor } from "@angular/common";

// libs/ui/src/lib/icon/icon.component.ts
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import * as i0 from "@angular/core";
var SIZE_CLASSES = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl"
};
var IconComponent = class _IconComponent {
  name;
  size = "md";
  ariaLabel;
  get classList() {
    const sizeClass = SIZE_CLASSES[this.size] ?? SIZE_CLASSES.md;
    return "inline-flex items-center justify-center text-inherit " + sizeClass;
  }
  get ariaHidden() {
    return this.ariaLabel ? null : "true";
  }
  static \u0275fac = function IconComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IconComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _IconComponent, selectors: [["ui-icon"]], hostVars: 2, hostBindings: function IconComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      i0.\u0275\u0275classMap(ctx.classList);
    }
  }, inputs: { name: "name", size: "size", ariaLabel: [0, "aria-label", "ariaLabel"] }, decls: 2, vars: 3, consts: [[1, "material-symbols-outlined", "leading-none"]], template: function IconComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275domElementStart(0, "span", 0);
      i0.\u0275\u0275text(1);
      i0.\u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      i0.\u0275\u0275attribute("aria-hidden", ctx.ariaHidden)("aria-label", ctx.ariaLabel);
      i0.\u0275\u0275advance();
      i0.\u0275\u0275textInterpolate1(" ", ctx.name, "\n");
    }
  }, styles: ["\n\n/*# sourceMappingURL=icon.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(IconComponent, { className: "IconComponent", filePath: "libs/ui/src/lib/icon/icon.component.ts", lineNumber: 16 });
})();

// libs/ui/src/lib/card/card.component.ts
import { ChangeDetectionStrategy as ChangeDetectionStrategy2, Component as Component2, Input as Input2 } from "@angular/core";
import { NgIf } from "@angular/common";
import * as i02 from "@angular/core";
var _c0 = ["*", [["", "card-actions", ""]]];
var _c1 = ["*", "[card-actions]"];
function CardComponent_header_1_p_4_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "p", 7);
    i02.\u0275\u0275text(1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i02.\u0275\u0275nextContext(2);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
function CardComponent_header_1_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "header", 3)(1, "div", 4)(2, "h2", 5);
    i02.\u0275\u0275text(3);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275template(4, CardComponent_header_1_p_4_Template, 2, 1, "p", 6);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275projection(5, 1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance(3);
    i02.\u0275\u0275textInterpolate(ctx_r0.title);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275property("ngIf", ctx_r0.subtitle);
  }
}
var CardComponent = class _CardComponent {
  title = "";
  subtitle = "";
  static \u0275fac = function CardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _CardComponent, selectors: [["ui-card"]], inputs: { title: "title", subtitle: "subtitle" }, ngContentSelectors: _c1, decls: 4, vars: 1, consts: [[1, "rounded-2xl", "bg-white", "p-4", "shadow-sm", "ring-1", "ring-slate-200/60", "transition-colors", "dark:bg-slate-800", "dark:ring-slate-700/60", "lg:p-6"], ["class", "mb-4 flex flex-col gap-1 lg:flex-row lg:items-center", 4, "ngIf"], [1, "space-y-4", "text-sm", "text-slate-600", "dark:text-slate-200"], [1, "mb-4", "flex", "flex-col", "gap-1", "lg:flex-row", "lg:items-center"], [1, "flex-1"], [1, "text-lg", "font-semibold", "text-slate-900", "dark:text-white"], ["class", "text-sm text-slate-500 dark:text-slate-300", 4, "ngIf"], [1, "text-sm", "text-slate-500", "dark:text-slate-300"]], template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275projectionDef(_c0);
      i02.\u0275\u0275elementStart(0, "section", 0);
      i02.\u0275\u0275template(1, CardComponent_header_1_Template, 6, 2, "header", 1);
      i02.\u0275\u0275elementStart(2, "div", 2);
      i02.\u0275\u0275projection(3);
      i02.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i02.\u0275\u0275advance();
      i02.\u0275\u0275property("ngIf", ctx.title || ctx.subtitle);
    }
  }, dependencies: [NgIf], styles: ["\n\n/*# sourceMappingURL=card.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "libs/ui/src/lib/card/card.component.ts", lineNumber: 12 });
})();

// apps/mfe-marketing/src/app/remote-entry/remote-entry.component.ts
import * as i03 from "@angular/core";
function RemoteEntryComponent_ui_card_7_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275elementStart(0, "ui-card", 6)(1, "div", 7)(2, "div", 8);
    i03.\u0275\u0275element(3, "ui-icon", 9);
    i03.\u0275\u0275text(4, " CTR: ");
    i03.\u0275\u0275elementStart(5, "strong", 10);
    i03.\u0275\u0275text(6);
    i03.\u0275\u0275elementEnd()();
    i03.\u0275\u0275elementStart(7, "div", 8);
    i03.\u0275\u0275element(8, "ui-icon", 11);
    i03.\u0275\u0275text(9, " CPA: ");
    i03.\u0275\u0275elementStart(10, "strong", 10);
    i03.\u0275\u0275text(11);
    i03.\u0275\u0275elementEnd()()();
    i03.\u0275\u0275elementStart(12, "p", 12);
    i03.\u0275\u0275element(13, "ui-icon", 13);
    i03.\u0275\u0275text(14);
    i03.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const campaign_r1 = ctx.$implicit;
    i03.\u0275\u0275property("title", campaign_r1.name)("subtitle", campaign_r1.channel);
    i03.\u0275\u0275advance(6);
    i03.\u0275\u0275textInterpolate(campaign_r1.ctr);
    i03.\u0275\u0275advance(5);
    i03.\u0275\u0275textInterpolate(campaign_r1.cpa);
    i03.\u0275\u0275advance(3);
    i03.\u0275\u0275textInterpolate1(" ", campaign_r1.status, " ");
  }
}
var RemoteEntryComponent = class _RemoteEntryComponent {
  campaigns = [
    { name: "Lanzamiento Q3 SaaS", channel: "LinkedIn Ads", ctr: "3.2%", cpa: "$18", status: "Activa" },
    { name: "Retenci\xF3n clientes", channel: "Email Automation", ctr: "4.9%", cpa: "$8", status: "Programada" },
    { name: "Campa\xF1a SEO contenidos", channel: "Blog + PR", ctr: "2.1%", cpa: "$12", status: "Activa" },
    { name: "Upsell product tour", channel: "In-app Messages", ctr: "5.4%", cpa: "$6", status: "Pausada" }
  ];
  static \u0275fac = function RemoteEntryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoteEntryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _RemoteEntryComponent, selectors: [["mfe-marketing-entry"]], decls: 8, vars: 1, consts: [[1, "space-y-6"], [1, "flex", "flex-col", "gap-2"], [1, "text-2xl", "font-semibold", "text-slate-900", "dark:text-white"], [1, "text-sm", "text-slate-500", "dark:text-slate-300"], [1, "grid", "gap-4", "lg:grid-cols-2"], [3, "title", "subtitle", 4, "ngFor", "ngForOf"], [3, "title", "subtitle"], [1, "flex", "items-center", "justify-between", "text-sm"], [1, "flex", "items-center", "gap-2", "text-slate-500", "dark:text-slate-300"], ["name", "bolt", "size", "sm"], [1, "text-slate-900", "dark:text-white"], ["name", "paid", "size", "sm"], [1, "mt-4", "inline-flex", "items-center", "gap-2", "rounded-full", "bg-blue-50", "px-3", "py-1", "text-xs", "font-medium", "text-blue-600", "dark:bg-blue-500/20", "dark:text-blue-200"], ["name", "play_circle", "size", "sm"]], template: function RemoteEntryComponent_Template(rf, ctx) {
    if (rf & 1) {
      i03.\u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "h1", 2);
      i03.\u0275\u0275text(3, "Marketing");
      i03.\u0275\u0275elementEnd();
      i03.\u0275\u0275elementStart(4, "p", 3);
      i03.\u0275\u0275text(5, " Monitoriza campa\xF1as y su desempe\xF1o en tiempo real. ");
      i03.\u0275\u0275elementEnd()();
      i03.\u0275\u0275elementStart(6, "div", 4);
      i03.\u0275\u0275template(7, RemoteEntryComponent_ui_card_7_Template, 15, 5, "ui-card", 5);
      i03.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i03.\u0275\u0275advance(7);
      i03.\u0275\u0275property("ngForOf", ctx.campaigns);
    }
  }, dependencies: [NgFor, CardComponent, IconComponent], styles: ["\n\n/*# sourceMappingURL=remote-entry.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(RemoteEntryComponent, { className: "RemoteEntryComponent", filePath: "apps/mfe-marketing/src/app/remote-entry/remote-entry.component.ts", lineNumber: 21 });
})();
export {
  RemoteEntryComponent
};
//# sourceMappingURL=Component.js.map
