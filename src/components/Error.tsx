
export function Error(props: { msg: string }) {
  return (
    <span role="alert" className="text-xs dark:text-red-500 text-red-700">
      {props.msg}
    </span>
  );
}
