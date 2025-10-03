import {
  SidebarMenu,
  init_sidebar_menu
} from "./chunk-KACOCJMV.js";
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

// apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.spec.ts
var require_sidebar_menu_spec = __commonJS({
  "apps/mfe-dashboard/src/app/components/sidebar-menu/sidebar-menu.spec.ts"(exports) {
    init_testing();
    init_sidebar_menu();
    describe("SidebarMenu", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [SidebarMenu]
        }).compileComponents();
        fixture = TestBed.createComponent(SidebarMenu);
        component = fixture.componentInstance;
        component.main = { id: "dashboard", label: "Dashboard", icon: "dashboard" };
        component.sections = [{ title: "Section", items: [{ id: "item-1", label: "Item 1", icon: "tasks" }] }];
        component.utilities = [{ id: "settings", label: "Settings", icon: "settings" }];
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_sidebar_menu_spec();
//# sourceMappingURL=spec-app-components-sidebar-menu-sidebar-menu.spec.js.map
