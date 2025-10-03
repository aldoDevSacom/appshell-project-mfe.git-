import {
  __async
} from "./chunk-Y5RQAIA6.js";

// node_modules/es-module-shims/dist/es-module-shims.js
(function() {
  const hasDocument = typeof document !== "undefined";
  const noop = () => {
  };
  const optionsScript = hasDocument ? document.querySelector("script[type=esms-options]") : void 0;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector("script[nonce]");
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const { revokeBlobURLs, noLoadEventRetriggers, globalLoadEventRetrigger, enforceIntegrity } = esmsInitOptions;
  function globalHook(name) {
    return typeof name === "string" ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  const wasmModulesEnabled = enable.includes("wasm-modules");
  const sourcePhaseEnabled = enable.includes("source-phase");
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log(`%c^^ Module error above is polyfilled and can be ignored ^^`, "font-weight:900;color:#391");
  };
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes("/") ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) : location.pathname}`;
  const createBlob = (source, type = "text/javascript") => URL.createObjectURL(new Blob([source], { type }));
  let { skip } = esmsInitOptions;
  if (Array.isArray(skip)) {
    const l2 = skip.map((s2) => new URL(s2, baseUrl).href);
    skip = (s2) => l2.some((i2) => i2[i2.length - 1] === "/" && s2.startsWith(i2) || s2 === i2);
  } else if (typeof skip === "string") {
    const r2 = new RegExp(skip);
    skip = (s2) => r2.test(s2);
  } else if (skip instanceof RegExp) {
    skip = (s2) => skip.test(s2);
  }
  const dispatchError = (error) => self.dispatchEvent(Object.assign(new Event("error"), { error }));
  const throwError = (err) => {
    (self.reportError || dispatchError)(err), void onerror(err);
  };
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : "";
  }
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }
  if (!shimMode) {
    if (document.querySelectorAll("script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]").length) {
      shimMode = true;
    } else {
      let seenScript = false;
      for (const script of document.querySelectorAll("script[type=module],script[type=importmap]")) {
        if (!seenScript) {
          if (script.type === "module" && !script.ep)
            seenScript = true;
        } else if (script.type === "importmap" && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }
  const backslashRegEx = /\\/g;
  function asURL(url) {
    try {
      if (url.indexOf(":") !== -1)
        return new URL(url).href;
    } catch (_) {
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (asURL(relUrl) || resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    const hIdx = parentUrl.indexOf("#"), qIdx = parentUrl.indexOf("?");
    if (hIdx + qIdx > -2)
      parentUrl = parentUrl.slice(0, hIdx === -1 ? qIdx : qIdx === -1 || qIdx > hIdx ? hIdx : qIdx);
    if (relUrl.indexOf("\\") !== -1)
      relUrl = relUrl.replace(backslashRegEx, "/");
    if (relUrl[0] === "/" && relUrl[1] === "/") {
      return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
      if (parentProtocol === "blob:") {
        throw new TypeError(`Failed to resolve module specifier "${relUrl}". Invalid relative url or base scheme isn't hierarchical.`);
      }
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === "/") {
        if (parentProtocol !== "file:") {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf("/") + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
      }
      if (relUrl[0] === "/")
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
      const segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;
      for (let i2 = 0; i2 < segmented.length; i2++) {
        if (segmentIndex !== -1) {
          if (segmented[i2] === "/") {
            output.push(segmented.slice(segmentIndex, i2 + 1));
            segmentIndex = -1;
          }
          continue;
        } else if (segmented[i2] === ".") {
          if (segmented[i2 + 1] === "." && (segmented[i2 + 2] === "/" || i2 + 2 === segmented.length)) {
            output.pop();
            i2 += 2;
            continue;
          } else if (segmented[i2 + 1] === "/" || i2 + 1 === segmented.length) {
            i2 += 1;
            continue;
          }
        }
        while (segmented[i2] === "/") i2++;
        segmentIndex = i2;
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveAndComposeImportMap(json, baseUrl2, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes), integrity: Object.assign({}, parentMap.integrity) };
    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl2, parentMap);
    if (json.scopes)
      for (let s2 in json.scopes) {
        const resolvedScope = resolveUrl(s2, baseUrl2);
        resolveAndComposePackages(json.scopes[s2], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
      }
    if (json.integrity)
      resolveAndComposeIntegrity(json.integrity, outMap.integrity, baseUrl2);
    return outMap;
  }
  function getMatch(path, matchObj) {
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
  }
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null) return;
      return pkg + id.slice(pkgName.length);
    }
  }
  function resolveImportMap(importMap2, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap2.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap2.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), importMap2.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap2.imports) || resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain;
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p2 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p2];
      if (typeof target !== "string")
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl2) || target, baseUrl2);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p2}" -> "${packages[p2]}" does not resolve`);
    }
  }
  function resolveAndComposeIntegrity(integrity, outIntegrity, baseUrl2) {
    for (let p2 in integrity) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
      if ((!shimMode || !mapOverrides) && outIntegrity[resolvedLhs] && outIntegrity[resolvedLhs] !== integrity[resolvedLhs]) {
        throw Error(`Rejected map integrity override "${resolvedLhs}" from ${outIntegrity[resolvedLhs]} to ${integrity[resolvedLhs]}.`);
      }
      outIntegrity[resolvedLhs] = integrity[p2];
    }
  }
  let dynamicImport = !hasDocument && (0, eval)("u=>import(u)");
  let supportsDynamicImport;
  const dynamicImportCheck = hasDocument && new Promise((resolve2) => {
    const s2 = Object.assign(document.createElement("script"), {
      src: createBlob("self._d=u=>import(u)"),
      ep: true
    });
    s2.setAttribute("nonce", nonce);
    s2.addEventListener("load", () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener("error", (_err) => err = _err);
        dynamicImport = (url, opts) => new Promise((resolve3, reject) => {
          const s3 = Object.assign(document.createElement("script"), {
            type: "module",
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = void 0;
          s3.ep = true;
          if (nonce)
            s3.setAttribute("nonce", nonce);
          s3.addEventListener("error", cb);
          s3.addEventListener("load", cb);
          function cb(_err) {
            document.head.removeChild(s3);
            if (self._esmsi) {
              resolve3(self._esmsi, baseUrl);
              self._esmsi = void 0;
            } else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s3.src}).`));
              err = void 0;
            }
          }
          document.head.appendChild(s3);
        });
      }
      document.head.removeChild(s2);
      delete self._d;
      resolve2();
    });
    document.head.appendChild(s2);
  });
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  const supports = hasDocument && HTMLScriptElement.supports;
  let supportsImportMaps = supports && supports.name === "supports" && supports("importmap");
  let supportsImportMeta = supportsDynamicImport;
  let supportsWasmModules = false;
  let supportsSourcePhase = false;
  const wasmBytes = [0, 97, 115, 109, 1, 0, 0, 0];
  let featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport)
      return;
    if (!hasDocument)
      return Promise.all([
        supportsImportMaps || dynamicImport(createBlob("import.meta")).then(() => supportsImportMeta = true, noop),
        cssModulesEnabled && dynamicImport(createBlob(`import"${createBlob("", "text/css")}"with{type:"css"}`)).then(() => supportsCssAssertions = true, noop),
        jsonModulesEnabled && dynamicImport(createBlob(`import"${createBlob("{}", "text/json")}"with{type:"json"}`)).then(() => supportsJsonAssertions = true, noop),
        wasmModulesEnabled && dynamicImport(createBlob(`import"${createBlob(new Uint8Array(wasmBytes), "application/wasm")}"`)).then(() => supportsWasmModules = true, noop),
        wasmModulesEnabled && sourcePhaseEnabled && dynamicImport(createBlob(`import source x from"${createBlob(new Uint8Array(wasmBytes), "application/wasm")}"`)).then(() => supportsSourcePhase = true, noop)
      ]);
    return new Promise((resolve2) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("nonce", nonce);
      function cb({ data }) {
        const isFeatureDetectionMessage = Array.isArray(data) && data[0] === "esms";
        if (!isFeatureDetectionMessage)
          return;
        [, supportsImportMaps, supportsImportMeta, supportsCssAssertions, supportsJsonAssertions, supportsWasmModules, supportsSourcePhase] = data;
        resolve2();
        document.head.removeChild(iframe);
        window.removeEventListener("message", cb, false);
      }
      window.addEventListener("message", cb, false);
      const importMapTest = `<script nonce=${nonce || ""}>b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${supportsImportMaps ? "true,true" : `'x',b('import.meta')`}, ${cssModulesEnabled ? `b(\`import"\${b('','text/css')}"with{type:"css"}\`)` : "false"}, ${jsonModulesEnabled ? `b(\`import"\${b('{}','text/json')}"with{type:"json"}\`)` : "false"}, ${wasmModulesEnabled ? `b(\`import"\${b(new Uint8Array(${JSON.stringify(wasmBytes)}),'application/wasm')}"\`)` : "false"}, ${wasmModulesEnabled && sourcePhaseEnabled ? `b(\`import source x from "\${b(new Uint8Array(${JSON.stringify(wasmBytes)}),'application/wasm')}"\`)` : "false"}].map(x =>typeof x==='string'?import(x).then(()=>true,()=>false):x)).then(a=>parent.postMessage(['esms'].concat(a),'*'))<${""}/script>`;
      let readyForOnload = false, onloadCalledWhileNotReady = false;
      function doOnload() {
        if (!readyForOnload) {
          onloadCalledWhileNotReady = true;
          return;
        }
        const doc = iframe.contentDocument;
        if (doc && doc.head.childNodes.length === 0) {
          const s2 = doc.createElement("script");
          if (nonce)
            s2.setAttribute("nonce", nonce);
          s2.innerHTML = importMapTest.slice(15 + (nonce ? nonce.length : 0), -9);
          doc.head.appendChild(s2);
        }
      }
      iframe.onload = doOnload;
      document.head.appendChild(iframe);
      readyForOnload = true;
      if ("srcdoc" in iframe)
        iframe.srcdoc = importMapTest;
      else
        iframe.contentDocument.write(importMapTest);
      if (onloadCalledWhileNotReady) doOnload();
    });
  });
  let e, a, r, i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; ) a2[i2] = e2.charCodeAt(i2++);
  } : function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; ) {
      const r3 = e2.charCodeAt(i2);
      a2[i2++] = (255 & r3) << 8 | r3 >>> 8;
    }
  }, f = "xportmportlassforetaourceromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileifcatcfinallels";
  let t, c$1, n;
  function parse(k2, l2 = "@") {
    t = k2, c$1 = l2;
    const u2 = 2 * t.length + (2 << 18);
    if (u2 > i || !e) {
      for (; u2 > i; ) i *= 2;
      a = new ArrayBuffer(i), s(f, new Uint16Array(a, 16, 110)), e = (function(e2, a2, r2) {
        ;
        var i2 = new e2.Int8Array(r2), s2 = new e2.Int16Array(r2), f2 = new e2.Int32Array(r2), t2 = new e2.Uint8Array(r2), c2 = new e2.Uint16Array(r2), n2 = 1040;
        function b2() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, b3 = 0, u4 = 0;
          u4 = n2;
          n2 = n2 + 10240 | 0;
          i2[804] = 1;
          i2[803] = 0;
          s2[399] = 0;
          s2[400] = 0;
          f2[69] = f2[2];
          i2[805] = 0;
          f2[68] = 0;
          i2[802] = 0;
          f2[70] = u4 + 2048;
          f2[71] = u4;
          i2[806] = 0;
          e3 = (f2[3] | 0) + -2 | 0;
          f2[72] = e3;
          a3 = e3 + (f2[66] << 1) | 0;
          f2[73] = a3;
          e: while (1) {
            r3 = e3 + 2 | 0;
            f2[72] = r3;
            if (e3 >>> 0 >= a3 >>> 0) {
              t3 = 18;
              break;
            }
            a: do {
              switch (s2[r3 >> 1] | 0) {
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 32:
                  break;
                case 101: {
                  if ((((s2[400] | 0) == 0 ? H(r3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (k3(), (i2[804] | 0) == 0) : 0) {
                    t3 = 9;
                    break e;
                  } else t3 = 17;
                  break;
                }
                case 105: {
                  if (H(r3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                    l3();
                    t3 = 17;
                  } else t3 = 17;
                  break;
                }
                case 59: {
                  t3 = 17;
                  break;
                }
                case 47:
                  switch (s2[e3 + 4 >> 1] | 0) {
                    case 47: {
                      P();
                      break a;
                    }
                    case 42: {
                      y(1);
                      break a;
                    }
                    default: {
                      t3 = 16;
                      break e;
                    }
                  }
                default: {
                  t3 = 16;
                  break e;
                }
              }
            } while (0);
            if ((t3 | 0) == 17) {
              t3 = 0;
              f2[69] = f2[72];
            }
            e3 = f2[72] | 0;
            a3 = f2[73] | 0;
          }
          if ((t3 | 0) == 9) {
            e3 = f2[72] | 0;
            f2[69] = e3;
            t3 = 19;
          } else if ((t3 | 0) == 16) {
            i2[804] = 0;
            f2[72] = e3;
            t3 = 19;
          } else if ((t3 | 0) == 18) if (!(i2[802] | 0)) {
            e3 = r3;
            t3 = 19;
          } else e3 = 0;
          do {
            if ((t3 | 0) == 19) {
              e: while (1) {
                a3 = e3 + 2 | 0;
                f2[72] = a3;
                if (e3 >>> 0 >= (f2[73] | 0) >>> 0) {
                  t3 = 92;
                  break;
                }
                a: do {
                  switch (s2[a3 >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101: {
                      if (((s2[400] | 0) == 0 ? H(a3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                        k3();
                        t3 = 91;
                      } else t3 = 91;
                      break;
                    }
                    case 105: {
                      if (H(a3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                        l3();
                        t3 = 91;
                      } else t3 = 91;
                      break;
                    }
                    case 99: {
                      if ((H(a3) | 0 ? (m(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? V(s2[e3 + 12 >> 1] | 0) | 0 : 0) {
                        i2[806] = 1;
                        t3 = 91;
                      } else t3 = 91;
                      break;
                    }
                    case 40: {
                      r3 = f2[70] | 0;
                      e3 = s2[400] | 0;
                      t3 = e3 & 65535;
                      f2[r3 + (t3 << 3) >> 2] = 1;
                      a3 = f2[69] | 0;
                      s2[400] = e3 + 1 << 16 >> 16;
                      f2[r3 + (t3 << 3) + 4 >> 2] = a3;
                      t3 = 91;
                      break;
                    }
                    case 41: {
                      a3 = s2[400] | 0;
                      if (!(a3 << 16 >> 16)) {
                        t3 = 36;
                        break e;
                      }
                      r3 = a3 + -1 << 16 >> 16;
                      s2[400] = r3;
                      t3 = s2[399] | 0;
                      a3 = t3 & 65535;
                      if (t3 << 16 >> 16 != 0 ? (f2[(f2[70] | 0) + ((r3 & 65535) << 3) >> 2] | 0) == 5 : 0) {
                        a3 = f2[(f2[71] | 0) + (a3 + -1 << 2) >> 2] | 0;
                        r3 = a3 + 4 | 0;
                        if (!(f2[r3 >> 2] | 0)) f2[r3 >> 2] = (f2[69] | 0) + 2;
                        f2[a3 + 12 >> 2] = e3 + 4;
                        s2[399] = t3 + -1 << 16 >> 16;
                        t3 = 91;
                      } else t3 = 91;
                      break;
                    }
                    case 123: {
                      t3 = f2[69] | 0;
                      r3 = f2[63] | 0;
                      e3 = t3;
                      do {
                        if ((s2[t3 >> 1] | 0) == 41 & (r3 | 0) != 0 ? (f2[r3 + 4 >> 2] | 0) == (t3 | 0) : 0) {
                          a3 = f2[64] | 0;
                          f2[63] = a3;
                          if (!a3) {
                            f2[59] = 0;
                            break;
                          } else {
                            f2[a3 + 32 >> 2] = 0;
                            break;
                          }
                        }
                      } while (0);
                      r3 = f2[70] | 0;
                      a3 = s2[400] | 0;
                      t3 = a3 & 65535;
                      f2[r3 + (t3 << 3) >> 2] = (i2[806] | 0) == 0 ? 2 : 6;
                      s2[400] = a3 + 1 << 16 >> 16;
                      f2[r3 + (t3 << 3) + 4 >> 2] = e3;
                      i2[806] = 0;
                      t3 = 91;
                      break;
                    }
                    case 125: {
                      e3 = s2[400] | 0;
                      if (!(e3 << 16 >> 16)) {
                        t3 = 49;
                        break e;
                      }
                      r3 = f2[70] | 0;
                      t3 = e3 + -1 << 16 >> 16;
                      s2[400] = t3;
                      if ((f2[r3 + ((t3 & 65535) << 3) >> 2] | 0) == 4) {
                        h2();
                        t3 = 91;
                      } else t3 = 91;
                      break;
                    }
                    case 39: {
                      v(39);
                      t3 = 91;
                      break;
                    }
                    case 34: {
                      v(34);
                      t3 = 91;
                      break;
                    }
                    case 47:
                      switch (s2[e3 + 4 >> 1] | 0) {
                        case 47: {
                          P();
                          break a;
                        }
                        case 42: {
                          y(1);
                          break a;
                        }
                        default: {
                          e3 = f2[69] | 0;
                          a3 = s2[e3 >> 1] | 0;
                          r: do {
                            if (!(U(a3) | 0)) if (a3 << 16 >> 16 == 41) {
                              r3 = s2[400] | 0;
                              if (!(D(f2[(f2[70] | 0) + ((r3 & 65535) << 3) + 4 >> 2] | 0) | 0)) t3 = 65;
                            } else t3 = 64;
                            else switch (a3 << 16 >> 16) {
                              case 46:
                                if (((s2[e3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                  t3 = 64;
                                  break r;
                                } else break r;
                              case 43:
                                if ((s2[e3 + -2 >> 1] | 0) == 43) {
                                  t3 = 64;
                                  break r;
                                } else break r;
                              case 45:
                                if ((s2[e3 + -2 >> 1] | 0) == 45) {
                                  t3 = 64;
                                  break r;
                                } else break r;
                              default:
                                break r;
                            }
                          } while (0);
                          if ((t3 | 0) == 64) {
                            r3 = s2[400] | 0;
                            t3 = 65;
                          }
                          r: do {
                            if ((t3 | 0) == 65) {
                              t3 = 0;
                              if (r3 << 16 >> 16 != 0 ? (c3 = f2[70] | 0, b3 = (r3 & 65535) + -1 | 0, a3 << 16 >> 16 == 102 ? (f2[c3 + (b3 << 3) >> 2] | 0) == 1 : 0) : 0) {
                                if ((s2[e3 + -2 >> 1] | 0) == 111 ? $(f2[c3 + (b3 << 3) + 4 >> 2] | 0, 44, 3) | 0 : 0) break;
                              } else t3 = 69;
                              if ((t3 | 0) == 69 ? (0, a3 << 16 >> 16 == 125) : 0) {
                                t3 = f2[70] | 0;
                                r3 = r3 & 65535;
                                if (p2(f2[t3 + (r3 << 3) + 4 >> 2] | 0) | 0) break;
                                if ((f2[t3 + (r3 << 3) >> 2] | 0) == 6) break;
                              }
                              if (!(o2(e3) | 0)) {
                                switch (a3 << 16 >> 16) {
                                  case 0:
                                    break r;
                                  case 47: {
                                    if (i2[805] | 0) break r;
                                    break;
                                  }
                                  default: {
                                  }
                                }
                                t3 = f2[65] | 0;
                                if ((t3 | 0 ? e3 >>> 0 >= (f2[t3 >> 2] | 0) >>> 0 : 0) ? e3 >>> 0 <= (f2[t3 + 4 >> 2] | 0) >>> 0 : 0) {
                                  g();
                                  i2[805] = 0;
                                  t3 = 91;
                                  break a;
                                }
                                r3 = f2[3] | 0;
                                do {
                                  if (e3 >>> 0 <= r3 >>> 0) break;
                                  e3 = e3 + -2 | 0;
                                  f2[69] = e3;
                                  a3 = s2[e3 >> 1] | 0;
                                } while (!(E(a3) | 0));
                                if (F(a3) | 0) {
                                  do {
                                    if (e3 >>> 0 <= r3 >>> 0) break;
                                    e3 = e3 + -2 | 0;
                                    f2[69] = e3;
                                  } while (F(s2[e3 >> 1] | 0) | 0);
                                  if (j(e3) | 0) {
                                    g();
                                    i2[805] = 0;
                                    t3 = 91;
                                    break a;
                                  }
                                }
                                i2[805] = 1;
                                t3 = 91;
                                break a;
                              }
                            }
                          } while (0);
                          g();
                          i2[805] = 0;
                          t3 = 91;
                          break a;
                        }
                      }
                    case 96: {
                      r3 = f2[70] | 0;
                      a3 = s2[400] | 0;
                      t3 = a3 & 65535;
                      f2[r3 + (t3 << 3) + 4 >> 2] = f2[69];
                      s2[400] = a3 + 1 << 16 >> 16;
                      f2[r3 + (t3 << 3) >> 2] = 3;
                      h2();
                      t3 = 91;
                      break;
                    }
                    default:
                      t3 = 91;
                  }
                } while (0);
                if ((t3 | 0) == 91) {
                  t3 = 0;
                  f2[69] = f2[72];
                }
                e3 = f2[72] | 0;
              }
              if ((t3 | 0) == 36) {
                T();
                e3 = 0;
                break;
              } else if ((t3 | 0) == 49) {
                T();
                e3 = 0;
                break;
              } else if ((t3 | 0) == 92) {
                e3 = (i2[802] | 0) == 0 ? (s2[399] | s2[400]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);
          n2 = u4;
          return e3 | 0;
        }
        function k3() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, n3 = 0, b3 = 0, k4 = 0, l4 = 0, o3 = 0, h3 = 0, d3 = 0, C2 = 0, g2 = 0;
          k4 = f2[72] | 0;
          l4 = f2[65] | 0;
          g2 = k4 + 12 | 0;
          f2[72] = g2;
          r3 = w2(1) | 0;
          e3 = f2[72] | 0;
          if (!((e3 | 0) == (g2 | 0) ? !(I(r3) | 0) : 0)) C2 = 3;
          e: do {
            if ((C2 | 0) == 3) {
              a: do {
                switch (r3 << 16 >> 16) {
                  case 123: {
                    f2[72] = e3 + 2;
                    e3 = w2(1) | 0;
                    a3 = f2[72] | 0;
                    while (1) {
                      if (W(e3) | 0) {
                        v(e3);
                        e3 = (f2[72] | 0) + 2 | 0;
                        f2[72] = e3;
                      } else {
                        q(e3) | 0;
                        e3 = f2[72] | 0;
                      }
                      w2(1) | 0;
                      e3 = A(a3, e3) | 0;
                      if (e3 << 16 >> 16 == 44) {
                        f2[72] = (f2[72] | 0) + 2;
                        e3 = w2(1) | 0;
                      }
                      if (e3 << 16 >> 16 == 125) {
                        C2 = 15;
                        break;
                      }
                      g2 = a3;
                      a3 = f2[72] | 0;
                      if ((a3 | 0) == (g2 | 0)) {
                        C2 = 12;
                        break;
                      }
                      if (a3 >>> 0 > (f2[73] | 0) >>> 0) {
                        C2 = 14;
                        break;
                      }
                    }
                    if ((C2 | 0) == 12) {
                      T();
                      break e;
                    } else if ((C2 | 0) == 14) {
                      T();
                      break e;
                    } else if ((C2 | 0) == 15) {
                      i2[803] = 1;
                      f2[72] = (f2[72] | 0) + 2;
                      break a;
                    }
                    break;
                  }
                  case 42: {
                    f2[72] = e3 + 2;
                    w2(1) | 0;
                    g2 = f2[72] | 0;
                    A(g2, g2) | 0;
                    break;
                  }
                  default: {
                    i2[804] = 0;
                    switch (r3 << 16 >> 16) {
                      case 100: {
                        k4 = e3 + 14 | 0;
                        f2[72] = k4;
                        switch ((w2(1) | 0) << 16 >> 16) {
                          case 97: {
                            a3 = f2[72] | 0;
                            if ((m(a3 + 2 | 0, 72, 8) | 0) == 0 ? (c3 = a3 + 10 | 0, F(s2[c3 >> 1] | 0) | 0) : 0) {
                              f2[72] = c3;
                              w2(0) | 0;
                              C2 = 22;
                            }
                            break;
                          }
                          case 102: {
                            C2 = 22;
                            break;
                          }
                          case 99: {
                            a3 = f2[72] | 0;
                            if (((m(a3 + 2 | 0, 36, 8) | 0) == 0 ? (t3 = a3 + 10 | 0, g2 = s2[t3 >> 1] | 0, V(g2) | 0 | g2 << 16 >> 16 == 123) : 0) ? (f2[72] = t3, n3 = w2(1) | 0, n3 << 16 >> 16 != 123) : 0) {
                              d3 = n3;
                              C2 = 31;
                            }
                            break;
                          }
                          default: {
                          }
                        }
                        r: do {
                          if ((C2 | 0) == 22 ? (b3 = f2[72] | 0, (m(b3 + 2 | 0, 80, 14) | 0) == 0) : 0) {
                            r3 = b3 + 16 | 0;
                            a3 = s2[r3 >> 1] | 0;
                            if (!(V(a3) | 0)) switch (a3 << 16 >> 16) {
                              case 40:
                              case 42:
                                break;
                              default:
                                break r;
                            }
                            f2[72] = r3;
                            a3 = w2(1) | 0;
                            if (a3 << 16 >> 16 == 42) {
                              f2[72] = (f2[72] | 0) + 2;
                              a3 = w2(1) | 0;
                            }
                            if (a3 << 16 >> 16 != 40) {
                              d3 = a3;
                              C2 = 31;
                            }
                          }
                        } while (0);
                        if ((C2 | 0) == 31 ? (o3 = f2[72] | 0, q(d3) | 0, h3 = f2[72] | 0, h3 >>> 0 > o3 >>> 0) : 0) {
                          O(e3, k4, o3, h3);
                          f2[72] = (f2[72] | 0) + -2;
                          break e;
                        }
                        O(e3, k4, 0, 0);
                        f2[72] = e3 + 12;
                        break e;
                      }
                      case 97: {
                        f2[72] = e3 + 10;
                        w2(0) | 0;
                        e3 = f2[72] | 0;
                        C2 = 35;
                        break;
                      }
                      case 102: {
                        C2 = 35;
                        break;
                      }
                      case 99: {
                        if ((m(e3 + 2 | 0, 36, 8) | 0) == 0 ? (a3 = e3 + 10 | 0, E(s2[a3 >> 1] | 0) | 0) : 0) {
                          f2[72] = a3;
                          g2 = w2(1) | 0;
                          C2 = f2[72] | 0;
                          q(g2) | 0;
                          g2 = f2[72] | 0;
                          O(C2, g2, C2, g2);
                          f2[72] = (f2[72] | 0) + -2;
                          break e;
                        }
                        e3 = e3 + 4 | 0;
                        f2[72] = e3;
                        break;
                      }
                      case 108:
                      case 118:
                        break;
                      default:
                        break e;
                    }
                    if ((C2 | 0) == 35) {
                      f2[72] = e3 + 16;
                      e3 = w2(1) | 0;
                      if (e3 << 16 >> 16 == 42) {
                        f2[72] = (f2[72] | 0) + 2;
                        e3 = w2(1) | 0;
                      }
                      C2 = f2[72] | 0;
                      q(e3) | 0;
                      g2 = f2[72] | 0;
                      O(C2, g2, C2, g2);
                      f2[72] = (f2[72] | 0) + -2;
                      break e;
                    }
                    f2[72] = e3 + 6;
                    i2[804] = 0;
                    r3 = w2(1) | 0;
                    e3 = f2[72] | 0;
                    r3 = (q(r3) | 0 | 32) << 16 >> 16 == 123;
                    t3 = f2[72] | 0;
                    if (r3) {
                      f2[72] = t3 + 2;
                      g2 = w2(1) | 0;
                      e3 = f2[72] | 0;
                      q(g2) | 0;
                    }
                    r: while (1) {
                      a3 = f2[72] | 0;
                      if ((a3 | 0) == (e3 | 0)) break;
                      O(e3, a3, e3, a3);
                      a3 = w2(1) | 0;
                      if (r3) switch (a3 << 16 >> 16) {
                        case 93:
                        case 125:
                          break e;
                        default: {
                        }
                      }
                      e3 = f2[72] | 0;
                      if (a3 << 16 >> 16 != 44) {
                        C2 = 51;
                        break;
                      }
                      f2[72] = e3 + 2;
                      a3 = w2(1) | 0;
                      e3 = f2[72] | 0;
                      switch (a3 << 16 >> 16) {
                        case 91:
                        case 123: {
                          C2 = 51;
                          break r;
                        }
                        default: {
                        }
                      }
                      q(a3) | 0;
                    }
                    if ((C2 | 0) == 51) f2[72] = e3 + -2;
                    if (!r3) break e;
                    f2[72] = t3 + -2;
                    break e;
                  }
                }
              } while (0);
              g2 = (w2(1) | 0) << 16 >> 16 == 102;
              e3 = f2[72] | 0;
              if (g2 ? (m(e3 + 2 | 0, 66, 6) | 0) == 0 : 0) {
                f2[72] = e3 + 8;
                u3(k4, w2(1) | 0, 0);
                e3 = (l4 | 0) == 0 ? 240 : l4 + 16 | 0;
                while (1) {
                  e3 = f2[e3 >> 2] | 0;
                  if (!e3) break e;
                  f2[e3 + 12 >> 2] = 0;
                  f2[e3 + 8 >> 2] = 0;
                  e3 = e3 + 16 | 0;
                }
              }
              f2[72] = e3 + -2;
            }
          } while (0);
          return;
        }
        function l3() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, n3 = 0, b3 = 0;
          c3 = f2[72] | 0;
          r3 = c3 + 12 | 0;
          f2[72] = r3;
          t3 = w2(1) | 0;
          a3 = f2[72] | 0;
          e: do {
            if (t3 << 16 >> 16 != 46) if (t3 << 16 >> 16 == 115 & a3 >>> 0 > r3 >>> 0) if ((m(a3 + 2 | 0, 56, 10) | 0) == 0 ? (e3 = a3 + 12 | 0, V(s2[e3 >> 1] | 0) | 0) : 0) n3 = 14;
            else {
              a3 = 6;
              r3 = 0;
              n3 = 46;
            }
            else {
              e3 = t3;
              r3 = 0;
              n3 = 15;
            }
            else {
              f2[72] = a3 + 2;
              switch ((w2(1) | 0) << 16 >> 16) {
                case 109: {
                  e3 = f2[72] | 0;
                  if (m(e3 + 2 | 0, 50, 6) | 0) break e;
                  a3 = f2[69] | 0;
                  if (!(G(a3) | 0) ? (s2[a3 >> 1] | 0) == 46 : 0) break e;
                  d2(c3, c3, e3 + 8 | 0, 2);
                  break e;
                }
                case 115: {
                  e3 = f2[72] | 0;
                  if (m(e3 + 2 | 0, 56, 10) | 0) break e;
                  a3 = f2[69] | 0;
                  if (!(G(a3) | 0) ? (s2[a3 >> 1] | 0) == 46 : 0) break e;
                  e3 = e3 + 12 | 0;
                  n3 = 14;
                  break e;
                }
                default:
                  break e;
              }
            }
          } while (0);
          if ((n3 | 0) == 14) {
            f2[72] = e3;
            e3 = w2(1) | 0;
            r3 = 1;
            n3 = 15;
          }
          e: do {
            if ((n3 | 0) == 15) switch (e3 << 16 >> 16) {
              case 40: {
                a3 = f2[70] | 0;
                b3 = s2[400] | 0;
                t3 = b3 & 65535;
                f2[a3 + (t3 << 3) >> 2] = 5;
                e3 = f2[72] | 0;
                s2[400] = b3 + 1 << 16 >> 16;
                f2[a3 + (t3 << 3) + 4 >> 2] = e3;
                if ((s2[f2[69] >> 1] | 0) == 46) break e;
                f2[72] = e3 + 2;
                a3 = w2(1) | 0;
                d2(c3, f2[72] | 0, 0, e3);
                if (r3) {
                  e3 = f2[63] | 0;
                  f2[e3 + 28 >> 2] = 5;
                } else e3 = f2[63] | 0;
                c3 = f2[71] | 0;
                b3 = s2[399] | 0;
                s2[399] = b3 + 1 << 16 >> 16;
                f2[c3 + ((b3 & 65535) << 2) >> 2] = e3;
                switch (a3 << 16 >> 16) {
                  case 39: {
                    v(39);
                    break;
                  }
                  case 34: {
                    v(34);
                    break;
                  }
                  default: {
                    f2[72] = (f2[72] | 0) + -2;
                    break e;
                  }
                }
                e3 = (f2[72] | 0) + 2 | 0;
                f2[72] = e3;
                switch ((w2(1) | 0) << 16 >> 16) {
                  case 44: {
                    f2[72] = (f2[72] | 0) + 2;
                    w2(1) | 0;
                    c3 = f2[63] | 0;
                    f2[c3 + 4 >> 2] = e3;
                    b3 = f2[72] | 0;
                    f2[c3 + 16 >> 2] = b3;
                    i2[c3 + 24 >> 0] = 1;
                    f2[72] = b3 + -2;
                    break e;
                  }
                  case 41: {
                    s2[400] = (s2[400] | 0) + -1 << 16 >> 16;
                    b3 = f2[63] | 0;
                    f2[b3 + 4 >> 2] = e3;
                    f2[b3 + 12 >> 2] = (f2[72] | 0) + 2;
                    i2[b3 + 24 >> 0] = 1;
                    s2[399] = (s2[399] | 0) + -1 << 16 >> 16;
                    break e;
                  }
                  default: {
                    f2[72] = (f2[72] | 0) + -2;
                    break e;
                  }
                }
              }
              case 123: {
                if (r3) {
                  a3 = 12;
                  r3 = 1;
                  n3 = 46;
                  break e;
                }
                e3 = f2[72] | 0;
                if (s2[400] | 0) {
                  f2[72] = e3 + -2;
                  break e;
                }
                while (1) {
                  if (e3 >>> 0 >= (f2[73] | 0) >>> 0) break;
                  e3 = w2(1) | 0;
                  if (!(W(e3) | 0)) {
                    if (e3 << 16 >> 16 == 125) {
                      n3 = 36;
                      break;
                    }
                  } else v(e3);
                  e3 = (f2[72] | 0) + 2 | 0;
                  f2[72] = e3;
                }
                if ((n3 | 0) == 36) f2[72] = (f2[72] | 0) + 2;
                b3 = (w2(1) | 0) << 16 >> 16 == 102;
                e3 = f2[72] | 0;
                if (b3 ? m(e3 + 2 | 0, 66, 6) | 0 : 0) {
                  T();
                  break e;
                }
                f2[72] = e3 + 8;
                e3 = w2(1) | 0;
                if (W(e3) | 0) {
                  u3(c3, e3, 0);
                  break e;
                } else {
                  T();
                  break e;
                }
              }
              default: {
                if (r3) {
                  a3 = 12;
                  r3 = 1;
                  n3 = 46;
                  break e;
                }
                switch (e3 << 16 >> 16) {
                  case 42:
                  case 39:
                  case 34: {
                    r3 = 0;
                    n3 = 48;
                    break e;
                  }
                  default: {
                    a3 = 6;
                    r3 = 0;
                    n3 = 46;
                    break e;
                  }
                }
              }
            }
          } while (0);
          if ((n3 | 0) == 46) {
            e3 = f2[72] | 0;
            if ((e3 | 0) == (c3 + (a3 << 1) | 0)) f2[72] = e3 + -2;
            else n3 = 48;
          }
          do {
            if ((n3 | 0) == 48) {
              if (s2[400] | 0) {
                f2[72] = (f2[72] | 0) + -2;
                break;
              }
              e3 = f2[73] | 0;
              a3 = f2[72] | 0;
              while (1) {
                if (a3 >>> 0 >= e3 >>> 0) {
                  n3 = 55;
                  break;
                }
                t3 = s2[a3 >> 1] | 0;
                if (W(t3) | 0) {
                  n3 = 53;
                  break;
                }
                b3 = a3 + 2 | 0;
                f2[72] = b3;
                a3 = b3;
              }
              if ((n3 | 0) == 53) {
                u3(c3, t3, r3);
                break;
              } else if ((n3 | 0) == 55) {
                T();
                break;
              }
            }
          } while (0);
          return;
        }
        function u3(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var i3 = 0, t3 = 0;
          i3 = (f2[72] | 0) + 2 | 0;
          switch (a3 << 16 >> 16) {
            case 39: {
              v(39);
              t3 = 5;
              break;
            }
            case 34: {
              v(34);
              t3 = 5;
              break;
            }
            default:
              T();
          }
          do {
            if ((t3 | 0) == 5) {
              d2(e3, i3, f2[72] | 0, 1);
              if (r3) f2[(f2[63] | 0) + 28 >> 2] = 4;
              f2[72] = (f2[72] | 0) + 2;
              a3 = w2(0) | 0;
              r3 = a3 << 16 >> 16 == 97;
              if (r3) {
                i3 = f2[72] | 0;
                if (m(i3 + 2 | 0, 94, 10) | 0) t3 = 13;
              } else {
                i3 = f2[72] | 0;
                if (!(((a3 << 16 >> 16 == 119 ? (s2[i3 + 2 >> 1] | 0) == 105 : 0) ? (s2[i3 + 4 >> 1] | 0) == 116 : 0) ? (s2[i3 + 6 >> 1] | 0) == 104 : 0)) t3 = 13;
              }
              if ((t3 | 0) == 13) {
                f2[72] = i3 + -2;
                break;
              }
              f2[72] = i3 + ((r3 ? 6 : 4) << 1);
              if ((w2(1) | 0) << 16 >> 16 != 123) {
                f2[72] = i3;
                break;
              }
              r3 = f2[72] | 0;
              a3 = r3;
              e: while (1) {
                f2[72] = a3 + 2;
                a3 = w2(1) | 0;
                switch (a3 << 16 >> 16) {
                  case 39: {
                    v(39);
                    f2[72] = (f2[72] | 0) + 2;
                    a3 = w2(1) | 0;
                    break;
                  }
                  case 34: {
                    v(34);
                    f2[72] = (f2[72] | 0) + 2;
                    a3 = w2(1) | 0;
                    break;
                  }
                  default:
                    a3 = q(a3) | 0;
                }
                if (a3 << 16 >> 16 != 58) {
                  t3 = 22;
                  break;
                }
                f2[72] = (f2[72] | 0) + 2;
                switch ((w2(1) | 0) << 16 >> 16) {
                  case 39: {
                    v(39);
                    break;
                  }
                  case 34: {
                    v(34);
                    break;
                  }
                  default: {
                    t3 = 26;
                    break e;
                  }
                }
                f2[72] = (f2[72] | 0) + 2;
                switch ((w2(1) | 0) << 16 >> 16) {
                  case 125: {
                    t3 = 31;
                    break e;
                  }
                  case 44:
                    break;
                  default: {
                    t3 = 30;
                    break e;
                  }
                }
                f2[72] = (f2[72] | 0) + 2;
                if ((w2(1) | 0) << 16 >> 16 == 125) {
                  t3 = 31;
                  break;
                }
                a3 = f2[72] | 0;
              }
              if ((t3 | 0) == 22) {
                f2[72] = i3;
                break;
              } else if ((t3 | 0) == 26) {
                f2[72] = i3;
                break;
              } else if ((t3 | 0) == 30) {
                f2[72] = i3;
                break;
              } else if ((t3 | 0) == 31) {
                t3 = f2[63] | 0;
                f2[t3 + 16 >> 2] = r3;
                f2[t3 + 12 >> 2] = (f2[72] | 0) + 2;
                break;
              }
            }
          } while (0);
          return;
        }
        function o2(e3) {
          e3 = e3 | 0;
          e: do {
            switch (s2[e3 >> 1] | 0) {
              case 100:
                switch (s2[e3 + -2 >> 1] | 0) {
                  case 105: {
                    e3 = $(e3 + -4 | 0, 104, 2) | 0;
                    break e;
                  }
                  case 108: {
                    e3 = $(e3 + -4 | 0, 108, 3) | 0;
                    break e;
                  }
                  default: {
                    e3 = 0;
                    break e;
                  }
                }
              case 101:
                switch (s2[e3 + -2 >> 1] | 0) {
                  case 115:
                    switch (s2[e3 + -4 >> 1] | 0) {
                      case 108: {
                        e3 = B(e3 + -6 | 0, 101) | 0;
                        break e;
                      }
                      case 97: {
                        e3 = B(e3 + -6 | 0, 99) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  case 116: {
                    e3 = $(e3 + -4 | 0, 114, 4) | 0;
                    break e;
                  }
                  case 117: {
                    e3 = $(e3 + -4 | 0, 122, 6) | 0;
                    break e;
                  }
                  default: {
                    e3 = 0;
                    break e;
                  }
                }
              case 102: {
                if ((s2[e3 + -2 >> 1] | 0) == 111 ? (s2[e3 + -4 >> 1] | 0) == 101 : 0) switch (s2[e3 + -6 >> 1] | 0) {
                  case 99: {
                    e3 = $(e3 + -8 | 0, 134, 6) | 0;
                    break e;
                  }
                  case 112: {
                    e3 = $(e3 + -8 | 0, 146, 2) | 0;
                    break e;
                  }
                  default: {
                    e3 = 0;
                    break e;
                  }
                }
                else e3 = 0;
                break;
              }
              case 107: {
                e3 = $(e3 + -2 | 0, 150, 4) | 0;
                break;
              }
              case 110: {
                e3 = e3 + -2 | 0;
                if (B(e3, 105) | 0) e3 = 1;
                else e3 = $(e3, 158, 5) | 0;
                break;
              }
              case 111: {
                e3 = B(e3 + -2 | 0, 100) | 0;
                break;
              }
              case 114: {
                e3 = $(e3 + -2 | 0, 168, 7) | 0;
                break;
              }
              case 116: {
                e3 = $(e3 + -2 | 0, 182, 4) | 0;
                break;
              }
              case 119:
                switch (s2[e3 + -2 >> 1] | 0) {
                  case 101: {
                    e3 = B(e3 + -4 | 0, 110) | 0;
                    break e;
                  }
                  case 111: {
                    e3 = $(e3 + -4 | 0, 190, 3) | 0;
                    break e;
                  }
                  default: {
                    e3 = 0;
                    break e;
                  }
                }
              default:
                e3 = 0;
            }
          } while (0);
          return e3 | 0;
        }
        function h2() {
          var e3 = 0, a3 = 0, r3 = 0, i3 = 0;
          a3 = f2[73] | 0;
          r3 = f2[72] | 0;
          e: while (1) {
            e3 = r3 + 2 | 0;
            if (r3 >>> 0 >= a3 >>> 0) {
              a3 = 10;
              break;
            }
            switch (s2[e3 >> 1] | 0) {
              case 96: {
                a3 = 7;
                break e;
              }
              case 36: {
                if ((s2[r3 + 4 >> 1] | 0) == 123) {
                  a3 = 6;
                  break e;
                }
                break;
              }
              case 92: {
                e3 = r3 + 4 | 0;
                break;
              }
              default: {
              }
            }
            r3 = e3;
          }
          if ((a3 | 0) == 6) {
            e3 = r3 + 4 | 0;
            f2[72] = e3;
            a3 = f2[70] | 0;
            i3 = s2[400] | 0;
            r3 = i3 & 65535;
            f2[a3 + (r3 << 3) >> 2] = 4;
            s2[400] = i3 + 1 << 16 >> 16;
            f2[a3 + (r3 << 3) + 4 >> 2] = e3;
          } else if ((a3 | 0) == 7) {
            f2[72] = e3;
            r3 = f2[70] | 0;
            i3 = (s2[400] | 0) + -1 << 16 >> 16;
            s2[400] = i3;
            if ((f2[r3 + ((i3 & 65535) << 3) >> 2] | 0) != 3) T();
          } else if ((a3 | 0) == 10) {
            f2[72] = e3;
            T();
          }
          return;
        }
        function w2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0;
          r3 = f2[72] | 0;
          e: do {
            a3 = s2[r3 >> 1] | 0;
            a: do {
              if (a3 << 16 >> 16 != 47) if (e3) if (V(a3) | 0) break;
              else break e;
              else if (F(a3) | 0) break;
              else break e;
              else switch (s2[r3 + 2 >> 1] | 0) {
                case 47: {
                  P();
                  break a;
                }
                case 42: {
                  y(e3);
                  break a;
                }
                default: {
                  a3 = 47;
                  break e;
                }
              }
            } while (0);
            i3 = f2[72] | 0;
            r3 = i3 + 2 | 0;
            f2[72] = r3;
          } while (i3 >>> 0 < (f2[73] | 0) >>> 0);
          return a3 | 0;
        }
        function d2(e3, a3, r3, s3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          s3 = s3 | 0;
          var t3 = 0, c3 = 0;
          c3 = f2[67] | 0;
          f2[67] = c3 + 36;
          t3 = f2[63] | 0;
          f2[((t3 | 0) == 0 ? 236 : t3 + 32 | 0) >> 2] = c3;
          f2[64] = t3;
          f2[63] = c3;
          f2[c3 + 8 >> 2] = e3;
          if (2 == (s3 | 0)) {
            e3 = 3;
            t3 = r3;
          } else {
            t3 = 1 == (s3 | 0);
            e3 = t3 ? 1 : 2;
            t3 = t3 ? r3 + 2 | 0 : 0;
          }
          f2[c3 + 12 >> 2] = t3;
          f2[c3 + 28 >> 2] = e3;
          f2[c3 >> 2] = a3;
          f2[c3 + 4 >> 2] = r3;
          f2[c3 + 16 >> 2] = 0;
          f2[c3 + 20 >> 2] = s3;
          a3 = 1 == (s3 | 0);
          i2[c3 + 24 >> 0] = a3 & 1;
          f2[c3 + 32 >> 2] = 0;
          if (a3 | 2 == (s3 | 0)) i2[803] = 1;
          return;
        }
        function v(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0;
          t3 = f2[73] | 0;
          a3 = f2[72] | 0;
          while (1) {
            i3 = a3 + 2 | 0;
            if (a3 >>> 0 >= t3 >>> 0) {
              a3 = 9;
              break;
            }
            r3 = s2[i3 >> 1] | 0;
            if (r3 << 16 >> 16 == e3 << 16 >> 16) {
              a3 = 10;
              break;
            }
            if (r3 << 16 >> 16 == 92) {
              r3 = a3 + 4 | 0;
              if ((s2[r3 >> 1] | 0) == 13) {
                a3 = a3 + 6 | 0;
                a3 = (s2[a3 >> 1] | 0) == 10 ? a3 : r3;
              } else a3 = r3;
            } else if (Z(r3) | 0) {
              a3 = 9;
              break;
            } else a3 = i3;
          }
          if ((a3 | 0) == 9) {
            f2[72] = i3;
            T();
          } else if ((a3 | 0) == 10) f2[72] = i3;
          return;
        }
        function A(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0, t3 = 0, c3 = 0;
          r3 = f2[72] | 0;
          i3 = s2[r3 >> 1] | 0;
          c3 = (e3 | 0) == (a3 | 0);
          t3 = c3 ? 0 : e3;
          c3 = c3 ? 0 : a3;
          if (i3 << 16 >> 16 == 97) {
            f2[72] = r3 + 4;
            r3 = w2(1) | 0;
            e3 = f2[72] | 0;
            if (W(r3) | 0) {
              v(r3);
              a3 = (f2[72] | 0) + 2 | 0;
              f2[72] = a3;
            } else {
              q(r3) | 0;
              a3 = f2[72] | 0;
            }
            i3 = w2(1) | 0;
            r3 = f2[72] | 0;
          }
          if ((r3 | 0) != (e3 | 0)) O(e3, a3, t3, c3);
          return i3 | 0;
        }
        function C() {
          var e3 = 0, a3 = 0, r3 = 0;
          r3 = f2[73] | 0;
          a3 = f2[72] | 0;
          e: while (1) {
            e3 = a3 + 2 | 0;
            if (a3 >>> 0 >= r3 >>> 0) {
              a3 = 6;
              break;
            }
            switch (s2[e3 >> 1] | 0) {
              case 13:
              case 10: {
                a3 = 6;
                break e;
              }
              case 93: {
                a3 = 7;
                break e;
              }
              case 92: {
                e3 = a3 + 4 | 0;
                break;
              }
              default: {
              }
            }
            a3 = e3;
          }
          if ((a3 | 0) == 6) {
            f2[72] = e3;
            T();
            e3 = 0;
          } else if ((a3 | 0) == 7) {
            f2[72] = e3;
            e3 = 93;
          }
          return e3 | 0;
        }
        function g() {
          var e3 = 0, a3 = 0, r3 = 0;
          e: while (1) {
            e3 = f2[72] | 0;
            a3 = e3 + 2 | 0;
            f2[72] = a3;
            if (e3 >>> 0 >= (f2[73] | 0) >>> 0) {
              r3 = 7;
              break;
            }
            switch (s2[a3 >> 1] | 0) {
              case 13:
              case 10: {
                r3 = 7;
                break e;
              }
              case 47:
                break e;
              case 91: {
                C() | 0;
                break;
              }
              case 92: {
                f2[72] = e3 + 4;
                break;
              }
              default: {
              }
            }
          }
          if ((r3 | 0) == 7) T();
          return;
        }
        function p2(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 62: {
              e3 = (s2[e3 + -2 >> 1] | 0) == 61;
              break;
            }
            case 41:
            case 59: {
              e3 = 1;
              break;
            }
            case 104: {
              e3 = $(e3 + -2 | 0, 210, 4) | 0;
              break;
            }
            case 121: {
              e3 = $(e3 + -2 | 0, 218, 6) | 0;
              break;
            }
            case 101: {
              e3 = $(e3 + -2 | 0, 230, 3) | 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function y(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0, c3 = 0;
          t3 = (f2[72] | 0) + 2 | 0;
          f2[72] = t3;
          r3 = f2[73] | 0;
          while (1) {
            a3 = t3 + 2 | 0;
            if (t3 >>> 0 >= r3 >>> 0) break;
            i3 = s2[a3 >> 1] | 0;
            if (!e3 ? Z(i3) | 0 : 0) break;
            if (i3 << 16 >> 16 == 42 ? (s2[t3 + 4 >> 1] | 0) == 47 : 0) {
              c3 = 8;
              break;
            }
            t3 = a3;
          }
          if ((c3 | 0) == 8) {
            f2[72] = a3;
            a3 = t3 + 4 | 0;
          }
          f2[72] = a3;
          return;
        }
        function m(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var s3 = 0, f3 = 0;
          e: do {
            if (!r3) e3 = 0;
            else {
              while (1) {
                s3 = i2[e3 >> 0] | 0;
                f3 = i2[a3 >> 0] | 0;
                if (s3 << 24 >> 24 != f3 << 24 >> 24) break;
                r3 = r3 + -1 | 0;
                if (!r3) {
                  e3 = 0;
                  break e;
                } else {
                  e3 = e3 + 1 | 0;
                  a3 = a3 + 1 | 0;
                }
              }
              e3 = (s3 & 255) - (f3 & 255) | 0;
            }
          } while (0);
          return e3 | 0;
        }
        function I(e3) {
          e3 = e3 | 0;
          e: do {
            switch (e3 << 16 >> 16) {
              case 38:
              case 37:
              case 33: {
                e3 = 1;
                break;
              }
              default:
                if ((e3 & -8) << 16 >> 16 == 40 | (e3 + -58 & 65535) < 6) e3 = 1;
                else {
                  switch (e3 << 16 >> 16) {
                    case 91:
                    case 93:
                    case 94: {
                      e3 = 1;
                      break e;
                    }
                    default: {
                    }
                  }
                  e3 = (e3 + -123 & 65535) < 4;
                }
            }
          } while (0);
          return e3 | 0;
        }
        function U(e3) {
          e3 = e3 | 0;
          e: do {
            switch (e3 << 16 >> 16) {
              case 38:
              case 37:
              case 33:
                break;
              default:
                if (!((e3 + -58 & 65535) < 6 | (e3 + -40 & 65535) < 7 & e3 << 16 >> 16 != 41)) {
                  switch (e3 << 16 >> 16) {
                    case 91:
                    case 94:
                      break e;
                    default: {
                    }
                  }
                  return e3 << 16 >> 16 != 125 & (e3 + -123 & 65535) < 4 | 0;
                }
            }
          } while (0);
          return 1;
        }
        function x(e3) {
          e3 = e3 | 0;
          var a3 = 0;
          a3 = s2[e3 >> 1] | 0;
          e: do {
            if ((a3 + -9 & 65535) >= 5) {
              switch (a3 << 16 >> 16) {
                case 160:
                case 32: {
                  a3 = 1;
                  break e;
                }
                default: {
                }
              }
              if (I(a3) | 0) return a3 << 16 >> 16 != 46 | (G(e3) | 0) | 0;
              else a3 = 0;
            } else a3 = 1;
          } while (0);
          return a3 | 0;
        }
        function S(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0;
          r3 = n2;
          n2 = n2 + 16 | 0;
          i3 = r3;
          f2[i3 >> 2] = 0;
          f2[66] = e3;
          a3 = f2[3] | 0;
          t3 = a3 + (e3 << 1) | 0;
          e3 = t3 + 2 | 0;
          s2[t3 >> 1] = 0;
          f2[i3 >> 2] = e3;
          f2[67] = e3;
          f2[59] = 0;
          f2[63] = 0;
          f2[61] = 0;
          f2[60] = 0;
          f2[65] = 0;
          f2[62] = 0;
          n2 = r3;
          return a3 | 0;
        }
        function O(e3, a3, r3, s3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          s3 = s3 | 0;
          var t3 = 0, c3 = 0;
          t3 = f2[67] | 0;
          f2[67] = t3 + 20;
          c3 = f2[65] | 0;
          f2[((c3 | 0) == 0 ? 240 : c3 + 16 | 0) >> 2] = t3;
          f2[65] = t3;
          f2[t3 >> 2] = e3;
          f2[t3 + 4 >> 2] = a3;
          f2[t3 + 8 >> 2] = r3;
          f2[t3 + 12 >> 2] = s3;
          f2[t3 + 16 >> 2] = 0;
          i2[803] = 1;
          return;
        }
        function $(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var i3 = 0, s3 = 0;
          i3 = e3 + (0 - r3 << 1) | 0;
          s3 = i3 + 2 | 0;
          e3 = f2[3] | 0;
          if (s3 >>> 0 >= e3 >>> 0 ? (m(s3, a3, r3 << 1) | 0) == 0 : 0) if ((s3 | 0) == (e3 | 0)) e3 = 1;
          else e3 = x(i3) | 0;
          else e3 = 0;
          return e3 | 0;
        }
        function j(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 107: {
              e3 = $(e3 + -2 | 0, 150, 4) | 0;
              break;
            }
            case 101: {
              if ((s2[e3 + -2 >> 1] | 0) == 117) e3 = $(e3 + -4 | 0, 122, 6) | 0;
              else e3 = 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function B(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0;
          r3 = f2[3] | 0;
          if (r3 >>> 0 <= e3 >>> 0 ? (s2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0) if ((r3 | 0) == (e3 | 0)) r3 = 1;
          else r3 = E(s2[e3 + -2 >> 1] | 0) | 0;
          else r3 = 0;
          return r3 | 0;
        }
        function E(e3) {
          e3 = e3 | 0;
          e: do {
            if ((e3 + -9 & 65535) < 5) e3 = 1;
            else {
              switch (e3 << 16 >> 16) {
                case 32:
                case 160: {
                  e3 = 1;
                  break e;
                }
                default: {
                }
              }
              e3 = e3 << 16 >> 16 != 46 & (I(e3) | 0);
            }
          } while (0);
          return e3 | 0;
        }
        function P() {
          var e3 = 0, a3 = 0, r3 = 0;
          e3 = f2[73] | 0;
          r3 = f2[72] | 0;
          e: while (1) {
            a3 = r3 + 2 | 0;
            if (r3 >>> 0 >= e3 >>> 0) break;
            switch (s2[a3 >> 1] | 0) {
              case 13:
              case 10:
                break e;
              default:
                r3 = a3;
            }
          }
          f2[72] = a3;
          return;
        }
        function q(e3) {
          e3 = e3 | 0;
          while (1) {
            if (V(e3) | 0) break;
            if (I(e3) | 0) break;
            e3 = (f2[72] | 0) + 2 | 0;
            f2[72] = e3;
            e3 = s2[e3 >> 1] | 0;
            if (!(e3 << 16 >> 16)) {
              e3 = 0;
              break;
            }
          }
          return e3 | 0;
        }
        function z() {
          var e3 = 0;
          e3 = f2[(f2[61] | 0) + 20 >> 2] | 0;
          switch (e3 | 0) {
            case 1: {
              e3 = -1;
              break;
            }
            case 2: {
              e3 = -2;
              break;
            }
            default:
              e3 = e3 - (f2[3] | 0) >> 1;
          }
          return e3 | 0;
        }
        function D(e3) {
          e3 = e3 | 0;
          if (!($(e3, 196, 5) | 0) ? !($(e3, 44, 3) | 0) : 0) e3 = $(e3, 206, 2) | 0;
          else e3 = 1;
          return e3 | 0;
        }
        function F(e3) {
          e3 = e3 | 0;
          switch (e3 << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9: {
              e3 = 1;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function G(e3) {
          e3 = e3 | 0;
          if ((s2[e3 >> 1] | 0) == 46 ? (s2[e3 + -2 >> 1] | 0) == 46 : 0) e3 = (s2[e3 + -4 >> 1] | 0) == 46;
          else e3 = 0;
          return e3 | 0;
        }
        function H(e3) {
          e3 = e3 | 0;
          if ((f2[3] | 0) == (e3 | 0)) e3 = 1;
          else e3 = x(e3 + -2 | 0) | 0;
          return e3 | 0;
        }
        function J() {
          var e3 = 0;
          e3 = f2[(f2[62] | 0) + 12 >> 2] | 0;
          if (!e3) e3 = -1;
          else e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function K() {
          var e3 = 0;
          e3 = f2[(f2[61] | 0) + 12 >> 2] | 0;
          if (!e3) e3 = -1;
          else e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function L() {
          var e3 = 0;
          e3 = f2[(f2[62] | 0) + 8 >> 2] | 0;
          if (!e3) e3 = -1;
          else e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function M() {
          var e3 = 0;
          e3 = f2[(f2[61] | 0) + 16 >> 2] | 0;
          if (!e3) e3 = -1;
          else e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function N() {
          var e3 = 0;
          e3 = f2[(f2[61] | 0) + 4 >> 2] | 0;
          if (!e3) e3 = -1;
          else e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function Q() {
          var e3 = 0;
          e3 = f2[61] | 0;
          e3 = f2[((e3 | 0) == 0 ? 236 : e3 + 32 | 0) >> 2] | 0;
          f2[61] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function R() {
          var e3 = 0;
          e3 = f2[62] | 0;
          e3 = f2[((e3 | 0) == 0 ? 240 : e3 + 16 | 0) >> 2] | 0;
          f2[62] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function T() {
          i2[802] = 1;
          f2[68] = (f2[72] | 0) - (f2[3] | 0) >> 1;
          f2[72] = (f2[73] | 0) + 2;
          return;
        }
        function V(e3) {
          e3 = e3 | 0;
          return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
        }
        function W(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
        }
        function X() {
          return (f2[(f2[61] | 0) + 8 >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function Y() {
          return (f2[(f2[62] | 0) + 4 >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function Z(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
        }
        function _() {
          return (f2[f2[61] >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function ee() {
          return (f2[f2[62] >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function ae() {
          return t2[(f2[61] | 0) + 24 >> 0] | 0 | 0;
        }
        function re(e3) {
          e3 = e3 | 0;
          f2[3] = e3;
          return;
        }
        function ie() {
          return f2[(f2[61] | 0) + 28 >> 2] | 0;
        }
        function se() {
          return (i2[803] | 0) != 0 | 0;
        }
        function fe() {
          return (i2[804] | 0) != 0 | 0;
        }
        function te() {
          return f2[68] | 0;
        }
        function ce(e3) {
          e3 = e3 | 0;
          n2 = e3 + 992 + 15 & -16;
          return 992;
        }
        return { su: ce, ai: M, e: te, ee: Y, ele: J, els: L, es: ee, f: fe, id: z, ie: N, ip: ae, is: _, it: ie, ms: se, p: b2, re: R, ri: Q, sa: S, se: K, ses: re, ss: X };
      })("undefined" != typeof self ? self : global, {}, a), r = e.su(i - (2 << 17));
    }
    const h = t.length + 1;
    e.ses(r), e.sa(h - 1), s(t, new Uint16Array(a, r, h)), e.p() || (n = e.e(), o());
    const w = [], d = [];
    for (; e.ri(); ) {
      const a2 = e.is(), r2 = e.ie(), i2 = e.ai(), s2 = e.id(), f2 = e.ss(), c2 = e.se(), n2 = e.it();
      let k3;
      e.ip() && (k3 = b(-1 === s2 ? a2 : a2 + 1, t.charCodeAt(-1 === s2 ? a2 - 1 : a2))), w.push({ t: n2, n: k3, s: a2, e: r2, ss: f2, se: c2, d: s2, a: i2 });
    }
    for (; e.re(); ) {
      const a2 = e.es(), r2 = e.ee(), i2 = e.els(), s2 = e.ele(), f2 = t.charCodeAt(a2), c2 = i2 >= 0 ? t.charCodeAt(i2) : -1;
      d.push({ s: a2, e: r2, ls: i2, le: s2, n: 34 === f2 || 39 === f2 ? b(a2 + 1, f2) : t.slice(a2, r2), ln: i2 < 0 ? void 0 : 34 === c2 || 39 === c2 ? b(i2 + 1, c2) : t.slice(i2, s2) });
    }
    return [w, d, !!e.f(), !!e.ms()];
  }
  function b(e2, a2) {
    n = e2;
    let r2 = "", i2 = n;
    for (; ; ) {
      n >= t.length && o();
      const e3 = t.charCodeAt(n);
      if (e3 === a2) break;
      92 === e3 ? (r2 += t.slice(i2, n), r2 += k(), i2 = n) : (8232 === e3 || 8233 === e3 || u(e3) && o(), ++n);
    }
    return r2 += t.slice(i2, n++), r2;
  }
  function k() {
    let e2 = t.charCodeAt(++n);
    switch (++n, e2) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(l(2));
      case 117:
        return (function() {
          const e3 = t.charCodeAt(n);
          let a2;
          123 === e3 ? (++n, a2 = l(t.indexOf("}", n) - n), ++n, a2 > 1114111 && o()) : a2 = l(4);
          return a2 <= 65535 ? String.fromCharCode(a2) : (a2 -= 65536, String.fromCharCode(55296 + (a2 >> 10), 56320 + (1023 & a2)));
        })();
      case 116:
        return "	";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        10 === t.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o();
      default:
        if (e2 >= 48 && e2 <= 55) {
          let a2 = t.substr(n - 1, 3).match(/^[0-7]+/)[0], r2 = parseInt(a2, 8);
          return r2 > 255 && (a2 = a2.slice(0, -1), r2 = parseInt(a2, 8)), n += a2.length - 1, e2 = t.charCodeAt(n), "0" === a2 && 56 !== e2 && 57 !== e2 || o(), String.fromCharCode(r2);
        }
        return u(e2) ? "" : String.fromCharCode(e2);
    }
  }
  function l(e2) {
    const a2 = n;
    let r2 = 0, i2 = 0;
    for (let a3 = 0; a3 < e2; ++a3, ++n) {
      let e3, s2 = t.charCodeAt(n);
      if (95 !== s2) {
        if (s2 >= 97) e3 = s2 - 97 + 10;
        else if (s2 >= 65) e3 = s2 - 65 + 10;
        else {
          if (!(s2 >= 48 && s2 <= 57)) break;
          e3 = s2 - 48;
        }
        if (e3 >= 16) break;
        i2 = s2, r2 = 16 * r2 + e3;
      } else 95 !== i2 && 0 !== a3 || o(), i2 = s2;
    }
    return 95 !== i2 && n - a2 === e2 || o(), r2;
  }
  function u(e2) {
    return 13 === e2 || 10 === e2;
  }
  function o() {
    throw Object.assign(Error(`Parse error ${c$1}:${t.slice(0, n).split("\n").length}:${n - t.lastIndexOf("\n", n - 1)}`), { idx: n });
  }
  function _resolve(id, parentUrl) {
    return __async(this, null, function* () {
      const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl) || asURL(id);
      return {
        r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
        // b = bare specifier
        b: !urlResolved && !asURL(id)
      };
    });
  }
  const resolve = resolveHook ? (id, parentUrl) => __async(null, null, function* () {
    let result = resolveHook(id, parentUrl, defaultResolve);
    if (result && result.then)
      result = yield result;
    return result ? { r: result, b: !resolveIfNotPlainOrUrl(id, parentUrl) && !asURL(id) } : _resolve(id, parentUrl);
  }) : _resolve;
  function importHandler(id, ...args) {
    return __async(this, null, function* () {
      let parentUrl = args[args.length - 1];
      if (typeof parentUrl !== "string")
        parentUrl = baseUrl;
      yield initPromise;
      if (importHook) yield importHook(id, typeof args[1] !== "string" ? args[1] : {}, parentUrl);
      if (acceptingImportMaps || shimMode || !baselinePassthrough) {
        if (hasDocument)
          processScriptsAndPreloads(true);
        if (!shimMode)
          acceptingImportMaps = false;
      }
      yield importMapPromise;
      return (yield resolve(id, parentUrl)).r;
    });
  }
  function importShim(...args) {
    return __async(this, null, function* () {
      return topLevelLoad(yield importHandler(...args), { credentials: "same-origin" });
    });
  }
  if (sourcePhaseEnabled)
    importShim.source = function importShimSource(...args) {
      return __async(this, null, function* () {
        const url = yield importHandler(...args);
        const load = getOrCreateLoad(url, { credentials: "same-origin" }, null, null);
        lastLoad = void 0;
        if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
          onpolyfill();
          firstPolyfillLoad = false;
        }
        yield load.f;
        return importShim._s[load.r];
      });
    };
  self.importShim = importShim;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  importShim.resolve = resolveSync;
  importShim.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim.addImportMap = (importMapIn) => {
    if (!shimMode) throw new Error("Unsupported in polyfill mode.");
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };
  const registry = importShim._r = {};
  const sourceCache = importShim._s = {};
  function loadAll(load, seen) {
    return __async(this, null, function* () {
      seen[load.u] = 1;
      yield load.L;
      yield Promise.all(load.d.map(({ l: dep, s: sourcePhase }) => {
        if (dep.b || seen[dep.u])
          return;
        if (sourcePhase)
          return dep.f;
        return loadAll(dep, seen);
      }));
      if (!load.n)
        load.n = load.d.some((dep) => dep.l.n);
    });
  }
  let importMap = { imports: {}, scopes: {}, integrity: {} };
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && (!wasmModulesEnabled || supportsWasmModules) && (!sourcePhaseEnabled || supportsSourcePhase) && !importMapSrcOrLazy;
    if (sourcePhaseEnabled && typeof WebAssembly !== "undefined" && !Object.getPrototypeOf(WebAssembly.Module).name) {
      const s2 = Symbol();
      const brand = (m) => Object.defineProperty(m, s2, { writable: false, configurable: false, value: "WebAssembly.Module" });
      class AbstractModuleSource {
        get [Symbol.toStringTag]() {
          if (this[s2]) return this[s2];
          throw new TypeError("Not an AbstractModuleSource");
        }
      }
      const { Module: wasmModule, compile: wasmCompile, compileStreaming: wasmCompileStreaming } = WebAssembly;
      WebAssembly.Module = Object.setPrototypeOf(Object.assign(function Module(...args) {
        return brand(new wasmModule(...args));
      }, wasmModule), AbstractModuleSource);
      WebAssembly.Module.prototype = Object.setPrototypeOf(wasmModule.prototype, AbstractModuleSource.prototype);
      WebAssembly.compile = function compile(...args) {
        return wasmCompile(...args).then(brand);
      };
      WebAssembly.compileStreaming = function compileStreaming(...args) {
        return wasmCompileStreaming(...args).then(brand);
      };
    }
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports2 = HTMLScriptElement.supports || ((type) => type === "classic" || type === "module");
        HTMLScriptElement.supports = (type) => type === "importmap" || supports2(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type !== "childList") continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === "SCRIPT") {
                if (node.type === (shimMode ? "module-shim" : "module"))
                  processScript(node, true);
                if (node.type === (shimMode ? "importmap-shim" : "importmap"))
                  processImportMap(node, true);
              } else if (node.tagName === "LINK" && node.rel === (shimMode ? "modulepreload-shim" : "modulepreload")) {
                processPreload(node);
              }
            }
          }
        }).observe(document, { childList: true, subtree: true });
        processScriptsAndPreloads();
        if (document.readyState === "complete") {
          readyStateCompleteCheck();
        } else {
          function readyListener() {
            return __async(this, null, function* () {
              yield initPromise;
              processScriptsAndPreloads();
              if (document.readyState === "complete") {
                readyStateCompleteCheck();
                document.removeEventListener("readystatechange", readyListener);
              }
            });
          }
          document.addEventListener("readystatechange", readyListener);
        }
      }
    }
    return void 0;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  function topLevelLoad(url, fetchOpts, source, nativelyLoaded2, lastStaticLoadPromise2) {
    return __async(this, null, function* () {
      if (!shimMode)
        acceptingImportMaps = false;
      yield initPromise;
      yield importMapPromise;
      if (importHook) yield importHook(url, typeof fetchOpts !== "string" ? fetchOpts : {}, "");
      if (!shimMode && baselinePassthrough) {
        if (nativelyLoaded2)
          return null;
        yield lastStaticLoadPromise2;
        return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
      }
      const load = getOrCreateLoad(url, fetchOpts, null, source);
      linkLoad(load, fetchOpts);
      const seen = {};
      yield loadAll(load, seen);
      lastLoad = void 0;
      resolveDeps(load, seen);
      yield lastStaticLoadPromise2;
      if (source && !shimMode && !load.n) {
        if (nativelyLoaded2) return;
        if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
        return yield dynamicImport(createBlob(source), { errUrl: source });
      }
      if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded2) {
        onpolyfill();
        firstPolyfillLoad = false;
      }
      const module = yield dynamicImport(!shimMode && !load.n && nativelyLoaded2 ? load.u : load.b, { errUrl: load.u });
      if (load.s)
        (yield dynamicImport(load.s)).u$_(module);
      if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
      return module;
    });
  }
  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength) return;
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load) URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  let lastLoad;
  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;
    for (const { l: dep, s: sourcePhase } of load.d) {
      if (!sourcePhase)
        resolveDeps(dep, seen);
    }
    const [imports, exports] = load.a;
    const source = load.S;
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
    let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
    function pushStringTo(originalIndex) {
      while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
        const dynamicImportEnd = dynamicImportEndStack.pop();
        resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
        lastIndex = dynamicImportEnd;
      }
      resolvedSource += source.slice(lastIndex, originalIndex);
      lastIndex = originalIndex;
    }
    for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex, t: t2 } of imports) {
      if (t2 === 4) {
        let { l: depLoad } = load.d[depIndex++];
        pushStringTo(statementStart);
        resolvedSource += "import ";
        lastIndex = statementStart + 14;
        pushStringTo(start - 1);
        resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/'${createBlob(`export default importShim._s[${urlJsString(depLoad.r)}]`)}'`;
        lastIndex = statementEnd;
      } else if (dynamicImportIndex === -1) {
        let { l: depLoad } = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
        if (cycleShell) {
          if (!(blobUrl = depLoad.s)) {
            blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => {
              const q = depLoad.S[s2] === '"' || depLoad.S[s2] === "'";
              return `e$_${i2}=m${q ? `[` : "."}${depLoad.S.slice(s2, e2)}${q ? `]` : ""}`;
            }).join(",")}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i2) => `e$_${i2}`).join(",")};` : ""}export {${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => `e$_${i2} as ${depLoad.S.slice(s2, e2)}`).join(",")}}
//# sourceURL=${depLoad.r}?cycle`);
          }
        }
        pushStringTo(start - 1);
        resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/'${blobUrl}'`;
        if (!cycleShell && depLoad.s) {
          resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
          depLoad.s = void 0;
        }
        lastIndex = statementEnd;
      } else if (dynamicImportIndex === -2) {
        load.m = { url: load.r, resolve: metaResolve };
        metaHook(load.m, load.u);
        pushStringTo(start);
        resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
        lastIndex = statementEnd;
      } else {
        pushStringTo(statementStart + 6);
        resolvedSource += `Shim${t2 === 5 ? ".source" : ""}(`;
        dynamicImportEndStack.push(statementEnd - 1);
        lastIndex = start;
      }
    }
    if (load.s && (imports.length === 0 || imports[imports.length - 1].d === -1))
      resolvedSource += `
;import{u$_}from'${load.s}';try{u$_({${exports.filter((e2) => e2.ln).map(({ s: s2, e: e2, ln }) => `${source.slice(s2, e2)}:${ln}`).join(",")}})}catch(_){};
`;
    function pushSourceURL(commentPrefix, commentStart) {
      const urlStart = commentStart + commentPrefix.length;
      const commentEnd = source.indexOf("\n", urlStart);
      const urlEnd = commentEnd !== -1 ? commentEnd : source.length;
      let sourceUrl = source.slice(urlStart, urlEnd);
      try {
        sourceUrl = new URL(sourceUrl, load.r).href;
      } catch {
      }
      pushStringTo(urlStart);
      resolvedSource += sourceUrl;
      lastIndex = urlEnd;
    }
    let sourceURLCommentStart = source.lastIndexOf(sourceURLCommentPrefix);
    let sourceMapURLCommentStart = source.lastIndexOf(sourceMapURLCommentPrefix);
    if (sourceURLCommentStart < lastIndex) sourceURLCommentStart = -1;
    if (sourceMapURLCommentStart < lastIndex) sourceMapURLCommentStart = -1;
    if (sourceURLCommentStart !== -1 && (sourceMapURLCommentStart === -1 || sourceMapURLCommentStart > sourceURLCommentStart)) {
      pushSourceURL(sourceURLCommentPrefix, sourceURLCommentStart);
    }
    if (sourceMapURLCommentStart !== -1) {
      pushSourceURL(sourceMapURLCommentPrefix, sourceMapURLCommentStart);
      if (sourceURLCommentStart !== -1 && sourceURLCommentStart > sourceMapURLCommentStart)
        pushSourceURL(sourceURLCommentPrefix, sourceURLCommentStart);
    }
    pushStringTo(source.length);
    if (sourceURLCommentStart === -1)
      resolvedSource += sourceURLCommentPrefix + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = void 0;
  }
  const sourceURLCommentPrefix = "\n//# sourceURL=";
  const sourceMapURLCommentPrefix = "\n//# sourceMappingURL=";
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const wasmContentType = /^(application)\/wasm(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let p = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100)
      return new Promise((r2) => p.push(r2));
  }
  function popFetchPool() {
    c--;
    if (p.length)
      p.shift()();
  }
  function doFetch(url, fetchOpts, parent) {
    return __async(this, null, function* () {
      if (enforceIntegrity && !fetchOpts.integrity)
        throw Error(`No integrity for ${url}${fromParent(parent)}.`);
      const poolQueue = pushFetchPool();
      if (poolQueue) yield poolQueue;
      try {
        var res = yield fetchHook(url, fetchOpts);
      } catch (e2) {
        e2.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.
` + e2.message;
        throw e2;
      } finally {
        popFetchPool();
      }
      if (!res.ok) {
        const error = new TypeError(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
        error.response = res;
        throw error;
      }
      return res;
    });
  }
  function fetchModule(url, fetchOpts, parent) {
    return __async(this, null, function* () {
      const mapIntegrity = importMap.integrity[url];
      const res = yield doFetch(url, mapIntegrity && !fetchOpts.integrity ? Object.assign({}, fetchOpts, { integrity: mapIntegrity }) : fetchOpts, parent);
      const r2 = res.url;
      const contentType = res.headers.get("content-type");
      if (jsContentType.test(contentType))
        return { r: r2, s: yield res.text(), sp: null, t: "js" };
      else if (wasmContentType.test(contentType)) {
        const module = yield sourceCache[r2] || (sourceCache[r2] = WebAssembly.compileStreaming(res));
        sourceCache[r2] = module;
        let s2 = "", i2 = 0, importObj = "";
        for (const impt of WebAssembly.Module.imports(module)) {
          const specifier = urlJsString(impt.module);
          s2 += `import * as impt${i2} from ${specifier};
`;
          importObj += `${specifier}:impt${i2++},`;
        }
        i2 = 0;
        s2 += `const instance = await WebAssembly.instantiate(importShim._s[${urlJsString(r2)}], {${importObj}});
`;
        for (const expt of WebAssembly.Module.exports(module)) {
          s2 += `export const ${expt.name} = instance.exports['${expt.name}'];
`;
        }
        return { r: r2, s: s2, t: "wasm" };
      } else if (jsonContentType.test(contentType))
        return { r: r2, s: `export default ${yield res.text()}`, sp: null, t: "json" };
      else if (cssContentType.test(contentType)) {
        return { r: r2, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((yield res.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, ss: null, t: "css" };
      } else
        throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
    });
  }
  function getOrCreateLoad(url, fetchOpts, parent, source) {
    if (source && registry[url]) {
      let i2 = 0;
      while (registry[url + ++i2]) ;
      url += i2;
    }
    let load = registry[url];
    if (load) return load;
    registry[url] = load = {
      // url
      u: url,
      // response url
      r: source ? url : void 0,
      // fetchPromise
      f: void 0,
      // source
      S: source,
      // linkPromise
      L: void 0,
      // analysis
      a: void 0,
      // deps
      d: void 0,
      // blobUrl
      b: void 0,
      // shellUrl
      s: void 0,
      // needsShim
      n: false,
      // type
      t: null,
      // meta
      m: null
    };
    load.f = (() => __async(null, null, function* () {
      if (!load.S) {
        let t2;
        ({ r: load.r, s: load.S, t: t2 } = yield fetchCache[url] || fetchModule(url, fetchOpts, parent));
        if (t2 && !shimMode) {
          if (t2 === "css" && !cssModulesEnabled || t2 === "json" && !jsonModulesEnabled || t2 === "wasm" && !wasmModulesEnabled)
            throw featErr(`${t2}-modules`);
          if (t2 === "css" && !supportsCssAssertions || t2 === "json" && !supportsJsonAssertions || t2 === "wasm" && !supportsWasmModules)
            load.n = true;
        }
      }
      try {
        load.a = parse(load.S, load.u);
      } catch (e2) {
        throwError(e2);
        load.a = [[], [], false];
      }
      return load;
    }))();
    return load;
  }
  const featErr = (feat) => Error(`${feat} feature must be enabled via <script type="esms-options">{ "polyfillEnable": ["${feat}"] }<${""}/script>`);
  function linkLoad(load, fetchOpts) {
    if (load.L) return;
    load.L = load.f.then(() => __async(null, null, function* () {
      let childFetchOpts = fetchOpts;
      load.d = (yield Promise.all(load.a[0].map((_0) => __async(null, [_0], function* ({ n: n2, d, t: t2 }) {
        const sourcePhase = t2 >= 4;
        if (sourcePhase && !sourcePhaseEnabled)
          throw featErr("source-phase");
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta || sourcePhase && !supportsSourcePhase)
          load.n = true;
        if (d !== -1 || !n2) return;
        const { r: r2, b: b2 } = yield resolve(n2, load.r || load.u);
        if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (d !== -1) return;
        if (skip && skip(r2) && !sourcePhase) return { l: { b: r2 }, s: false };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        const child = { l: getOrCreateLoad(r2, childFetchOpts, load.r, null), s: sourcePhase };
        if (!child.s)
          linkLoad(child.l, fetchOpts);
        return child;
      })))).filter((l2) => l2);
    }));
  }
  function processScriptsAndPreloads(mapsOnly = false) {
    if (!mapsOnly)
      for (const link of document.querySelectorAll(shimMode ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]"))
        processPreload(link);
    for (const script of document.querySelectorAll(shimMode ? "script[type=importmap-shim]" : "script[type=importmap]"))
      processImportMap(script);
    if (!mapsOnly)
      for (const script of document.querySelectorAll(shimMode ? "script[type=module-shim]" : "script[type=module]"))
        processScript(script);
  }
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerPolicy)
      fetchOpts.referrerPolicy = script.referrerPolicy;
    if (script.fetchPriority)
      fetchOpts.priority = script.fetchPriority;
    if (script.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers && (shimMode || !baselinePassthrough)) {
      document.dispatchEvent(new Event("DOMContentLoaded"));
    }
  }
  let loadCnt = 1;
  function loadCheck() {
    if (--loadCnt === 0 && globalLoadEventRetrigger && !noLoadEventRetriggers && (shimMode || !baselinePassthrough)) {
      window.dispatchEvent(new Event("load"));
    }
  }
  if (hasDocument) {
    document.addEventListener("DOMContentLoaded", () => __async(null, null, function* () {
      yield initPromise;
      domContentLoadedCheck();
    }));
    window.addEventListener("load", () => __async(null, null, function* () {
      yield initPromise;
      loadCheck();
    }));
  }
  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers && (shimMode || !baselinePassthrough)) {
      document.dispatchEvent(new Event("readystatechange"));
    }
  }
  const hasNext = (script) => script.nextSibling || script.parentNode && hasNext(script.parentNode);
  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute("noshim") !== null || !(script.ep = true);
  function processImportMap(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return;
    if (script.src) {
      if (!shimMode)
        return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(() => __async(null, null, function* () {
        importMap = resolveAndComposeImportMap(script.src ? yield (yield doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      })).catch((e2) => {
        console.log(e2);
        if (e2 instanceof SyntaxError)
          e2 = new Error(`Unable to parse import map ${e2.message} in: ${script.src || script.innerHTML}`);
        throwError(e2);
      });
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }
  function processScript(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return;
    const isBlockingReadyScript = script.getAttribute("async") === null && readyStateCompleteCnt > 0;
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    const isLoadScript = loadCnt > 0;
    if (isLoadScript) loadCnt++;
    if (isBlockingReadyScript) readyStateCompleteCnt++;
    if (isDomContentLoadedScript) domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (!noLoadEventRetriggers)
      loadPromise.then(() => script.dispatchEvent(new Event("load")));
    if (isBlockingReadyScript)
      lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript)
      loadPromise.then(domContentLoadedCheck);
    if (isLoadScript)
      loadPromise.then(loadCheck);
  }
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();
//# sourceMappingURL=es-module-shims.js.map
