
export function ButtonSubmit({text, loading}: {text: string; loading: boolean}) {
    return <button disabled={loading} className="hover:bg-white hover:text-blue-950 cursor-pointer h-600 rounded-md bg-red-500 text-white text-present-4-light" type="submit">{text}</button>
}