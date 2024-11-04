import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '@alilc/lowcode-plugin-inject'
import { Message, Dialog } from '@alifd/next';
import { IPublicTypeProjectSchema, IPublicEnumTransformStage } from '@alilc/lowcode-types';
import DefaultPageSchema from './defaultPageSchema.json';
import DefaultI18nSchema from './defaultI18nSchema.json';
import { getProjectSchemaFromDB, updateProjectSchemaToDB } from './schemaServices';
import { stringify } from 'uuid';

// done
const generateProjectSchema = (pageSchema: any, i18nSchema: any): IPublicTypeProjectSchema => {
  return {
    componentsTree: [pageSchema],
    componentsMap: material.componentsMap as any,
    version: '1.0.0',
    i18n: i18nSchema,
  };
}

// done
export const saveSchema = async (scenarioName: string = 'unknown') => {
  setProjectSchemaToLocalStorage(scenarioName);
  await setPackagesToLocalStorage(scenarioName);
  Message.success('成功保存到数据库');
};

// done
export const resetSchema = async (scenarioName: string = 'unknown') => {
  try {
    await new Promise<void>((resolve, reject) => {
      Dialog.confirm({
        content: '确定要重置吗？您所有的修改都将消失！',
        onOk: () => {
          resolve();
        },
        onCancel: () => {
          reject()
        },
      })
    })
  } catch(err) {
    return;
  }
  const defaultSchema = generateProjectSchema(DefaultPageSchema, DefaultI18nSchema);

  project.importSchema(defaultSchema as any);
  project.simulatorHost?.rerender();

  setProjectSchemaToLocalStorage(scenarioName);
  await setPackagesToLocalStorage(scenarioName);
  Message.success('成功重置页面');
}

// done
const getLSName = (scenarioName: string, ns: string = 'projectSchema') => `${scenarioName}:${ns}`;

// done
export const getProjectSchemaFromLocalStorage = async (scenarioName: string): Promise<any> => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  // const localValue = window.localStorage.getItem(getLSName(scenarioName));
  const localValue = await getProjectSchemaFromDB(scenarioName);
  console.log(localValue);
  if (localValue) {
    return localValue[0].projectSchema as any; // Type assertion
  }
  return undefined;
}
// done
const setProjectSchemaToLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  // window.localStorage.setItem(
  //   getLSName(scenarioName),
  //   JSON.stringify(project.exportSchema(IPublicEnumTransformStage.Save))
  // );
  updateProjectSchemaToDB(scenarioName, project.exportSchema(IPublicEnumTransformStage.Save));
}

const setPackagesToLocalStorage = async (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  const packages = await filterPackages(material.getAssets().packages);
  window.localStorage.setItem(
    getLSName(scenarioName, 'packages'),
    JSON.stringify(packages),
  );
}

export const getPackagesFromLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  return JSON.parse(window.localStorage.getItem(getLSName(scenarioName, 'packages')) || '{}');
}

// done
export const getProjectSchema = async (scenarioName: string = 'unknown') : Promise<IPublicTypeProjectSchema> => {
  const pageSchema = await getPageSchema(scenarioName);
  return generateProjectSchema(pageSchema, DefaultI18nSchema);
};

// done
export const getPageSchema = async (scenarioName: string = 'unknown') => {
  // const pageSchema = getProjectSchemaFromLocalStorage(scenarioName)?.componentsTree?.[0];
  const pageSchema = (await getProjectSchemaFromLocalStorage(scenarioName))?.componentsTree?.[0];

  if (pageSchema) {
    return pageSchema;
  }

  return DefaultPageSchema;
};

export const getPreviewLocale = (scenarioName: string) => {
  const key = getLSName(scenarioName, 'previewLocale');
  console.log("key", key);
  return window.localStorage.getItem(key) || 'zh-CN';
}

export const setPreviewLocale = (scenarioName: string, locale: string) => {
  const key = getLSName(scenarioName, 'previewLocale');
  window.localStorage.setItem(key, locale || 'zh-CN');
  window.location.reload();
}