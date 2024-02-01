export default function CharComponent({characteristics}) {
    const keys = Object.keys(characteristics);

    return(
        <ul className="charc-ul-element">
            {keys.map(key => {
                return <li key={key}>{`${key} : ${characteristics[key]}`}</li>
            })}
        </ul>
    );
}