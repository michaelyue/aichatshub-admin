<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const userStore = useUserStore();
const userId = userStore.userInfo?.userId || '';

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
      fieldName: 'secretkey',
      label: $t('settings.openai-key-secret'),
    },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}
</script>

<template>
  <Page :description="$t('settings.desc')" :title="$t('settings.title')">
    <BaseForm />
  </Page>
</template>
