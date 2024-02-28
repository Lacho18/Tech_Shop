//function that sets randomised colors to the background of the text
export default function BoxSide(props) {
    function randomColor(type) {
        let color, red = 0, green = 0, blue = 0;

        switch (type) {
            case "red": red = Math.floor(Math.random() * 120) + 40;
                break;
            case "green": green = Math.floor(Math.random() * 120) + 40;
                break;
            case "blue": blue = Math.floor(Math.random() * 120) + 40;
                break;
        }

        color = `rgb(${red}, ${green}, ${blue})`;
        return color;
    }

    function removeFromCart(id) {
        props.onRemoving(id);
    }

    return (
        <div className="box-side">
            <div className="img-div">
                <img src={props.titleImage} />
            </div>
            <div className="card-text">     
                <p>Product type : <span style={{ background: `linear-gradient(to right, ${randomColor("red")}, ${randomColor("blue")})`, WebkitBackgroundClip: "text" }}>{props.type}</span></p>
                <p>Brand : <span style={{ background: `linear-gradient(to right, ${randomColor("red")}, ${randomColor("green")})`, WebkitBackgroundClip: "text" }}>{props.brand}</span></p>
                <p>Model : <span style={{ background: `linear-gradient(to right, ${randomColor("red")}, ${randomColor("blue")})`, WebkitBackgroundClip: "text" }}>{props.model}</span></p>
                <p>Warranty : <span style={{ background: `linear-gradient(to right, ${randomColor("green")}, ${randomColor("blue")})`, WebkitBackgroundClip: "text" }}>{props.warranty}</span></p>
                <p>Price : <span style={{ background: `linear-gradient(to right, ${randomColor("green")}, ${randomColor("red")})`, WebkitBackgroundClip: "text" }}>{props.price}</span></p>
            </div>

            <button id="XButton" onClick={() => {removeFromCart(props.unice)}}>✖️</button>
        </div>
    );
}