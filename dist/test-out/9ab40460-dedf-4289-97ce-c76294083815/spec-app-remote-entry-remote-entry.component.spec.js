import {
  DashboardLayout,
  init_dashboard_layout
} from "./chunk-QTTV644X.js";
import "./chunk-AUJVBIT5.js";
import "./chunk-WW6PLZ2I.js";
import "./chunk-4CNQZCCT.js";
import "./chunk-KACOCJMV.js";
import "./chunk-IFCZID4S.js";
import "./chunk-WUDFRZA3.js";
import "./chunk-XEZUBNE6.js";
import {
  ChangeDetectionStrategy,
  Component,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-XVQEXZI5.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-TTULUY32.js";

// apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts
var RemoteEntryComponent;
var init_remote_entry_component = __esm({
  "apps/mfe-dashboard/src/app/remote-entry/remote-entry.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_dashboard_layout();
    RemoteEntryComponent = class RemoteEntryComponent2 {
    };
    RemoteEntryComponent = __decorate([
      Component({
        selector: "mfe-dashboard-entry",
        standalone: true,
        imports: [DashboardLayout],
        template: `<app-dashboard-layout></app-dashboard-layout>`,
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
      it("renders the dashboard title", () => {
        const textContent = fixture.nativeElement.textContent ?? "";
        expect(textContent).toContain("Dashboard");
      });
    });
  }
});
export default require_remote_entry_component_spec();
//# sourceMappingURL=spec-app-remote-entry-remote-entry.component.spec.js.map
