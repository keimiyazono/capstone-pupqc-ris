import parse from 'html-react-parser';

type Props = {
  html: string;
};

export const TiptapRenderer = ({ html }: Props) => {
  // console.log({ html });
  // const output = useMemo(() => {
  //   return generateHTML(html, extensions);
  // }, [html]);

  return <div className="prose max-w-none">{parse(html)}</div>;
};
