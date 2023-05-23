import { Link } from "react-router-dom";
import Button from "./../../Shared/Button/Button";

const Nav = ()=>{
    return (
        <div className="container col-sm-12 col-lg-9 col-xl-6 mx-auto">
            <div className="row">
                <div className="d-flex align-items-center justify-content-between my-5 p-3 rounded-pill shadow bg-body-tertiary rounded">
                    <div>
                        <Link to="/" className="text-decoration-none">
                        <h4 className="text-info my-auto">Home</h4>
                        </Link>
                    </div>
                    <div>
                        <Button url="/create" color="primary" icon="plus" word=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;