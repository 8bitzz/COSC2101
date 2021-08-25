import { useHistory } from "react-router-dom";

const ErrorPopover = ({error}) => {
  const history = useHistory();
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5">
      <span className="inline-block align-middle mr-8">
        <b className="font-bold">Error!</b> {error}
      </span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={() => {
          history.push("/");
        }}
      >
        <span>×</span>
      </button>
    </div>
  )
}

export default ErrorPopover
