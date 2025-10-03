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
  TestBed,
  init_testing
} from "./chunk-XVQEXZI5.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.spec.ts
var require_dashboard_layout_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/dashboard-layout/dashboard-layout.spec.ts"(exports) {
    init_testing();
    init_dashboard_layout();
    describe("DashboardLayout", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DashboardLayout]
        }).compileComponents();
        fixture = TestBed.createComponent(DashboardLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_dashboard_layout_spec();
//# sourceMappingURL=spec-app-components-dashboard-layout-dashboard-layout.spec.js.map
