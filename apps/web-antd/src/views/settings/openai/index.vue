<script lang="ts" setup>
import type { UserAPIBundle } from '#/api';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getUserAPIKey } from '#/api';
import { $t } from '#/locales';

const userStore = useUserStore();
const userId = userStore.userInfo?.userId || '';

const keySecret = ref<string>('');

const [BaseForm] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },

  handleSubmit: onSubmit,
  layout: 'horizontal',
  schema: [
    {
      component: 'Hidden',
      fieldName: 'userId',
      defaultValue: userId,
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('settings.openai-key-secret-placehold'),
      },
      fieldName: 'keysecret',
      label: $t('settings.openai-key-secret'),
      modelValue: keySecret,
    },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

async function fetchUserKey() {
  let userKey: null | UserAPIBundle = null;
  userKey = await getUserAPIKey();
  keySecret.value = userKey === null ? '' : userKey.keysecret;
}

// Fetch the user key when component is mounted
onMounted(async () => {
  await fetchUserKey();
});
</script>

<template>
  <Page :description="$t('settings.desc')" :title="$t('settings.title')">
    <BaseForm v-model:keysecret="keySecret" />
  </Page>
</template>
