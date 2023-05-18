import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'datocms-plugin-sdk';
import ConfigScreen from './entrypoints/ConfigScreen';
import FieldExtension from './entrypoints/FieldExtension';
import { PluginAttributes } from 'datocms-plugin-sdk/dist/types/SiteApiSchema';
import { Config, ValidFieldType } from './types';
import 'datocms-react-ui/styles.css';

function render(component: React.ReactNode) {
  ReactDOM.render(
    <React.StrictMode>{component}</React.StrictMode>,
    document.getElementById('root'),
  );
}


connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions() {
    return [
      {
        id: 'sanitory',
        name: 'Sanitory',
        type: 'addon',
        fieldTypes: ['text', 'string', 'structured_text', "rich_text"] as NonNullable<
          PluginAttributes['field_types']
        >,
        configurable: true,
      },
    ];
  },
  overrideFieldExtensions(field, { plugin }) {
    const parameters = plugin.attributes.parameters as Config;

    if (!('autoApplyRules' in parameters)) {
      return;
    }
    const foundRule = parameters.autoApplyRules.find(
      (rule) =>
        new RegExp(rule.apiKeyRegexp).test(field.attributes.api_key) &&
        rule.fieldTypes.includes(field.attributes.field_type as ValidFieldType),
    );

    if (!foundRule) {
      return;
    }

    return {
      addons: [
        {
          id: 'sanitory',
        },
      ],
    };
  },
  renderFieldExtension(id, ctx) {
    render(<FieldExtension ctx={ctx} />);
  }
});