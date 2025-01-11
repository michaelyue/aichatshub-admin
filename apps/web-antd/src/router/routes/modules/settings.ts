import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('settings.title'),
    },
    name: 'Settings',
    path: '/settings',
    children: [
      {
        meta: {
          title: $t('settings.openai'),
        },
        name: 'AichatshubSettings',
        path: '/aichatshub/settings',
        component: () => import('#/views/settings/openai/index.vue'),
      },
    ],
  },
];

export default routes;
