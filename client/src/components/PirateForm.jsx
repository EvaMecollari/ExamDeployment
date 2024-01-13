import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const PirateForm = (props) => {

    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [treasureChest, setTreasureChest] = useState("")
    const [catchPhrase, setCatchPhrase] = useState("")
    const [position, setPosition] = useState("")
    const [pegLeg, setPegLeg] = useState(false)
    const [eyePatch, setEyePatch] = useState(false)
    const [hookHand, setHookHand] = useState(false)
    const [validation, setValidation] = useState({})
    const navigate = useNavigate()

    const {socket} = props

    const CreatePirate = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/pirates/', {
            name,
            img,
            treasureChest,
            catchPhrase,
            position,
            pegLeg,
            eyePatch,
            hookHand
        })
            .then(res => {
                socket.emit('toServer', res.data)
                navigate('/pirates')
            })
            .catch(err => {
                console.log(err)
                setValidation(err.response.data.errors)
            })
    }

    const PirateCrew = () => {
        navigate('/pirates')
    }


    return(
        <div className="shadow-lg p-3 mb-5 bg-white rounded coolor">
            <div className="pirateNav d-flex justify-content-between" >
            <h3>Add Pirate</h3>
            <button className=" coolor btn btn-primary" onClick={PirateCrew}>Crew Board</button>
            </div>
            <div className="orangebck ">
            <form className="d-flex justify-content-between w-75" onSubmit={CreatePirate}>
                <div>
                    <div className="form-group">
                        <label>Pirate Name:</label>
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                        {validation.name ? <p className="redVal">{validation.name.message}</p> : ""}
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Image Url:</label>
                        <input type="url" className="form-control" onChange={(e) => setImg(e.target.value)} />
                        {validation.img ? <p className="redVal">{validation.img.message}</p> : ""}
                    </div>
                    <br />
                    <div className="form-group">
                        <label># of Treasure Chests:</label>
                        <input type="number" className="form-control" onChange={(e) => setTreasureChest(e.target.value)} />
                        {validation.treasureChest ? <p className="redVal">{validation.treasureChest.message}</p> : ""}
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Pirate Catch Phrase:</label>
                        <input type="text" className="form-control" onChange={(e) => setCatchPhrase(e.target.value)} />
                        {validation.catchPhrase ? <p className="redVal">{validation.catchPhrase.message}</p> : ""}
                    </div>
                </div>
                <div>
                <div className="form-group">
                    <label>Crew Position&nbsp;&nbsp;&nbsp;</label>
                    <select onChange={(e) => setPosition(e.target.value)}>
                        
                        <option value={"Sailer"}>Sailer</option>
                        <option value={"Captain"}>Captain</option>
                        <option value={"First Mate"}>First Mate</option>
                        <option value={"BoatSwain"}>BoatSwain</option>
                        <option value={"Powder Monkey"}>Powder Monkey</option>
                    </select>
                    {validation.position ? <p className="redVal">{validation.position.message}</p> : ""}
                </div>
                <br/>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={() => {setPegLeg(!pegLeg)}}/>
                    <label className="form-check-label">Peg Leg </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={() => {setEyePatch(!eyePatch)}}/>
                    <label className="form-check-label">Eye Patch </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={() => {setHookHand(!hookHand)}}/>
                    <label className="form-check-label">Hook Hand </label>
                </div>
                <br/>
                <br/>
                <div className="text-center">
                <button type="submit" className="btn btn-primary">Add Pirate</button>
                </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default PirateForm;