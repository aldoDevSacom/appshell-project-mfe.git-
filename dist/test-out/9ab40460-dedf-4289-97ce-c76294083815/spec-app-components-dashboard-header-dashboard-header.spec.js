import {
  DashboardHeader,
  init_dashboard_header
} from "./chunk-AUJVBIT5.js";
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

// apps/mfe-dashboard/src/app/components/dashboard-header/dashboard-header.spec.ts
var require_dashboard_header_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/dashboard-header/dashboard-header.spec.ts"(exports) {
    init_testing();
    init_dashboard_header();
    describe("DashboardHeader", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DashboardHeader]
        }).compileComponents();
        fixture = TestBed.createComponent(DashboardHeader);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_dashboard_header_spec();
//# sourceMappingURL=spec-app-components-dashboard-header-dashboard-header.spec.js.map
