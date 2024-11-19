const Input = ({ type,name,ph,data,onChange }) => {

    return(
        <input 
            type={type}
            name={name}
            placeholder={ph}
            value={data}
            onChange={onChange}
            className="outline-none border shadow-sm py-1 px-2 text-sm rounded-md focus:border-[] w-full"
        />
    );
}
export default Input;