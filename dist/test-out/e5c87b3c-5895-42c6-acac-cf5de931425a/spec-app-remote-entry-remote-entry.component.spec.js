import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  TestBed,
  __decorate,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-S6GHNNZJ.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-TTULUY32.js";

// libs/ui/src/lib/icon/icon.component.ts
var SIZE_CLASSES, IconComponent;
var init_icon_component = __esm({
  "libs/ui/src/lib/icon/icon.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    SIZE_CLASSES = {
      sm: "text-base",
      md: "text-2xl",
      lg: "text-4xl"
    };
    IconComponent = class IconComponent2 {
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
      static propDecorators = {
        name: [{ type: Input, args: [{ required: true }] }],
        size: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ["aria-label"] }],
        classList: [{ type: HostBinding, args: ["class"] }]
      };
    };
    IconComponent = __decorate([
      Component({
        selector: "ui-icon",
        standalone: true,
        template: `
    <span
      class="material-symbols-outlined leading-none"
      [attr.aria-hidden]="ariaHidden"
      [attr.aria-label]="ariaLabel"
    >
      {{ name }}
    </span>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
      })
    ], IconComponent);
  }
});

// libs/ui/src/lib/card/card.component.ts
var CardComponent;
var init_card_component = __esm({
  "libs/ui/src/lib/card/card.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_common();
    CardComponent = class CardComponent2 {
      title = "";
      subtitle = "";
      static propDecorators = {
        title: [{ type: Input }],
        subtitle: [{ type: Input }]
      };
    };
    CardComponent = __decorate([
      Component({
        selector: "ui-card",
        standalone: true,
        imports: [NgIf],
        template: `
    <section
      class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 transition-colors dark:bg-slate-800 dark:ring-slate-700/60 lg:p-6"
    >
      <header *ngIf="title || subtitle" class="mb-4 flex flex-col gap-1 lg:flex-row lg:items-center">
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h2>
          <p *ngIf="subtitle" class="text-sm text-slate-500 dark:text-slate-300">{{ subtitle }}</p>
        </div>
        <ng-content select="[card-actions]"></ng-content>
      </header>
      <div class="space-y-4 text-sm text-slate-600 dark:text-slate-200">
        <ng-content></ng-content>
      </div>
    </section>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
      })
    ], CardComponent);
  }
});

// libs/ui/src/lib/button/button.component.ts
var ButtonComponent;
var init_button_component = __esm({
  "libs/ui/src/lib/button/button.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_common();
    ButtonComponent = class ButtonComponent2 {
      variant = "primary";
      ariaLabel;
      hostClass = "inline-flex";
      get variantClasses() {
        return this.variant === "ghost" ? "text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:outline-slate-500" : "bg-primary text-primary-foreground hover:bg-blue-600 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400";
      }
      static propDecorators = {
        variant: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ["aria-label"] }],
        hostClass: [{ type: HostBinding, args: ["class"] }]
      };
    };
    ButtonComponent = __decorate([
      Component({
        selector: "ui-button",
        standalone: true,
        imports: [NgClass],
        template: `
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      [ngClass]="variantClasses"
      [attr.aria-label]="ariaLabel"
    >
      <ng-content />
    </button>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
      })
    ], ButtonComponent);
  }
});

// libs/ui/src/lib/skeleton/skeleton.component.ts
var SkeletonComponent;
var init_skeleton_component = __esm({
  "libs/ui/src/lib/skeleton/skeleton.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    SkeletonComponent = class SkeletonComponent2 {
      width = 160;
      height = 16;
      static propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }]
      };
    };
    SkeletonComponent = __decorate([
      Component({
        selector: "ui-skeleton",
        standalone: true,
        template: `
    <span
      class="inline-block animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
      [style.width.px]="width"
      [style.height.px]="height"
    ></span>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
      })
    ], SkeletonComponent);
  }
});

// libs/ui/src/public-api.ts
var init_public_api = __esm({
  "libs/ui/src/public-api.ts"() {
    "use strict";
    init_icon_component();
    init_card_component();
    init_button_component();
    init_skeleton_component();
  }
});

// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts
var RemoteEntryComponent;
var init_remote_entry_component = __esm({
  "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_common();
    init_public_api();
    RemoteEntryComponent = class RemoteEntryComponent2 {
      kpis = [
        { label: "Total de tareas", value: "124", icon: "task", trend: "+12% vs. pasado" },
        { label: "Usuarios activos", value: "3.482", icon: "group", trend: "+5% mensual" },
        { label: "MRR", value: "$86K", icon: "trending_up", trend: "+8% intermensual" },
        { label: "Tickets abiertos", value: "18", icon: "support_agent", trend: "-4 desde ayer" }
      ];
      activity = [
        { title: "Nuevo usuario agregado al equipo de Ventas", time: "Hace 12 minutos" },
        { title: "Campa\xF1a \u201CLanzamiento Q3\u201D activada", time: "Hace 1 hora" },
        { title: "Se completaron 5 tareas cr\xEDticas", time: "Hace 4 horas" }
      ];
    };
    RemoteEntryComponent = __decorate([
      Component({
        selector: "mfe-dashboard-entry",
        standalone: true,
        imports: [NgForOf, CardComponent, IconComponent],
        template: `
    <section class="space-y-6">
      <header class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Panel general</h1>
        <p class="text-sm text-slate-500 dark:text-slate-300">
          Una vista r\xE1pida de los indicadores clave del negocio.
        </p>
      </header>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ui-card *ngFor="let kpi of kpis" [title]="kpi.label" [subtitle]="kpi.trend">
          <div class="flex items-baseline justify-between">
            <p class="text-3xl font-semibold">{{ kpi.value }}</p>
            <ui-icon [name]="kpi.icon" size="lg" aria-hidden="true"></ui-icon>
          </div>
        </ui-card>
      </div>

      <ui-card title="\xDAltima actividad" subtitle="Los \xFAltimos eventos dentro de tus productos">
        <ul class="space-y-3 text-sm">
          <li *ngFor="let event of activity" class="flex items-center justify-between">
            <span>{{ event.title }}</span>
            <span class="text-xs text-slate-400">{{ event.time }}</span>
          </li>
        </ul>
      </ui-card>
    </section>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
      })
    ], RemoteEntryComponent);
  }
});

// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.spec.ts
var require_remote_entry_component_spec = __commonJS({
  "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.spec.ts"(exports) {
    init_testing();
    init_remote_entry_component();
    describe("RemoteEntryComponent (Dashboard)", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [RemoteEntryComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(RemoteEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("shows the panel heading", () => {
        const heading = fixture.nativeElement.querySelector("h1");
        expect(heading?.textContent).toContain("Panel general");
      });
    });
  }
});
export default require_remote_entry_component_spec();
//# sourceMappingURL=spec-app-remote-entry-remote-entry.component.spec.js.map
