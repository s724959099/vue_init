import m0131dc2cac404127e8fa91c79fd237b0 from '@/pages/demo/_id.vue'
import m5532dff33d9249e8b7de5f1d86d201b8 from '@/pages/demo/index.vue'
import md87a1e977a6043e9fbe47258d8101d0e from '@/pages/demo/other/index.vue'
import mfc2caaae25584032934ddb418116b15e from '@/pages/index.vue'
import mff126f28657c4d16f6ee2d8a930eb58c from '@/pages/user/index.vue'
import m0fc6f4d165be478eff50111aac45c492 from '@/pages/_children/project/index.vue'
import m60b11621ed064e87f9efbb170e2e6a55 from '@/pages/main.vue'


export default [
  {
    "path": "/demo/:id",
    "name": "/demo/:id",
    "component": m0131dc2cac404127e8fa91c79fd237b0,
    "children": []
  },
  {
    "path": "/demo",
    "name": "/demo",
    "component": m5532dff33d9249e8b7de5f1d86d201b8,
    "children": []
  },
  {
    "path": "/demo/other",
    "name": "/demo/other",
    "component": md87a1e977a6043e9fbe47258d8101d0e,
    "children": []
  },
  {
    "path": "/",
    "name": "/",
    "component": mfc2caaae25584032934ddb418116b15e,
    "children": []
  },
  {
    "path": "/user",
    "name": "/user",
    "component": mff126f28657c4d16f6ee2d8a930eb58c,
    "children": []
  },
  {
    "path": "/",
    "name": "/",
    "component": m60b11621ed064e87f9efbb170e2e6a55,
    "children": [
      {
        "path": "/project",
        "name": "/project",
        "component": m0fc6f4d165be478eff50111aac45c492,
        "children": []
      }
    ]
  }
]
