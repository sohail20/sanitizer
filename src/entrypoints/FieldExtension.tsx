import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import s from './styles1.module.css';

type Props = {
  ctx: RenderFieldExtensionCtx;
};

export default function FieldExtension({ ctx }: Props) {

  const handleClick = () => {
    let oldValue: any = ctx.formValues[ctx.fieldPath]
    const regex = /(<([^>]+)>)/gi;
    const result = oldValue.replace(regex, "");
    console.log("ctxzx", result)
    ctx.setFieldValue(ctx.fieldPath, result);
  };

  return (
    <Canvas ctx={ctx}>
      <button type="button" onClick={handleClick} className={s.link}>
        Sanitize Text
      </button>
    </Canvas>
  );
}
