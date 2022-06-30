import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import {createRef, useState} from "react";
import anime from "animejs";
import Loading from "../components/Loading";

export default function Home() {
    const [premises, setPremises] = useState([{
        premise: 1,
        premiseState: true,
        premiseText: '',
        premiseSymbolText: ''
    }]);
    const [showConclusionInput, setShowConclusionInput] = useState(false)
    const [conclusionText, setConclusionText] = useState("")
    const [conclusionSymbolText, setConclusionSymbolText] = useState("")
    const [loading, setLoading] = useState(false)

    const myRef = createRef();
    const premiseRef = createRef();

    const addPremises = (event) => {
        event.preventDefault()

        const animation = anime({
            targets: myRef.current,
            rotate: '360deg',
            // opacity: [0, 1],
            easing: 'easeInOutCubic',
            duration: 1000,
        })

        animation.play()

        const tempPremises = [...premises]
        const id = parseInt(event.target.id)
        tempPremises.forEach(value => {
            if (value.premise === id) {
                value.premiseState = false
            }
        })

        tempPremises.push({premise: id + 1, premiseState: true, premiseText: '', premiseSymbolText: ''})

        setTimeout(() => {
            setPremises(tempPremises)
        }, 500)
    }

    const removePremise = (event) => {
        event.preventDefault()

        const animation = anime({
            targets: myRef.current,
            rotate: [0, 360],
            opacity: [1, 0],
            easing: 'easeInOutCubic',
            duration: 500
        })

        animation.play()

        const tempPremises = [...premises]
        const id = parseInt(event.target.id)
        for (let i = 0; i < tempPremises.length; i++) {
            if (tempPremises[i].premise === id && id === tempPremises.length - 1) {
                // console.log("At the end of the array")
                tempPremises[i].premiseState = true
                tempPremises.splice(i + 1, 1);
            } else if (tempPremises[i].premise === id) {
                tempPremises.splice(i + 1, 1);
            }
        }
        setTimeout(() => {
            setPremises(tempPremises)
        }, 500)
    }

    const setConclusion = (event) => {
        event.preventDefault()
        setConclusionText(event.target.value)
    }

    const setConclusionSymbol = (event) => {
        event.preventDefault()
        setConclusionSymbolText(event.target.value)
    }

    const setPremiseText = (event) => {
        event.preventDefault()
        const id = parseInt(event.target.id.split("-")[1])
        const tempPremises = [...premises]
        tempPremises.forEach(value => {
            if (value.premise === id) {
                value.premiseText = event.target.value
            }
        })
        setPremises(tempPremises)
    }

    const setPremiseSymbolText = (event) => {
        event.preventDefault()
        const id = parseInt(event.target.id.split("-")[1])
        const tempPremises = [...premises]
        tempPremises.forEach(value => {
            if (value.premise === id) {
                value.premiseSymbolText = event.target.value
            }
        })
        setPremises(tempPremises)
    }

    const conclusion = () => {
        return (
            <div className={"mt-5 d-flex align-items-center"}>
                <input className={styles.input_text} type={"text"} placeholder={"Conclusion"}
                       onChange={setConclusion}
                       value={conclusionText}/>
                <input className={styles.input_text} type={"text"} placeholder={"Conclusion Symbol"}
                       style={{fontStyle: 'italic', fontWeight: 'lighter'}} onChange={setConclusionSymbol}
                       value={conclusionSymbolText}/>
                <div className={styles.icon_bg + ` p-3 d-flex justify-content-center align-items-center`}>
                            <span
                                className={"material-symbols-outlined"}
                                onClick={() => {
                                    setConclusionText("")
                                    setConclusionSymbolText("")
                                    setShowConclusionInput(!showConclusionInput)
                                }}>remove</span>
                </div>
            </div>
        )
    }

    if (loading) return (<Loading/>)

    return (
        <Layout title={"Argument Validator"}>
            <div className={"d-flex justify-content-center w-100 p-5"}>
                <div className={"d-block w-50 justify-content-between"}>
                    <h3 className={"d-flex justify-content-center"}>Argument Validator</h3>
                    {premises.map((premise, key) => (
                        <div key={premise.premise} className={"d-flex align-items-center mt-5"}
                             ref={premiseRef}>
                            <input className={styles.input_text} type={"text"} placeholder={"Premise"}
                                   id={"premise-" + premise.premise.toString()}
                                   onChange={setPremiseText}
                                   value={premise.premiseText}/>
                            <input className={styles.input_text} type={"text"} placeholder={"Symbol"}
                                   id={"premiseSymbol-" + premise.premise.toString()}
                                   onChange={setPremiseSymbolText}
                                   value={premise.premiseSymbolText}
                                   style={{fontStyle: 'italic', fontWeight: '200'}}/>
                            <div className={styles.icon_bg + ` p-3 d-flex justify-content-center align-items-center`}>
                            <span
                                ref={myRef}
                                className={"material-symbols-outlined"}
                                onClick={premise.premiseState ? addPremises : removePremise}
                                id={premise.premise.toString()}>{premise.premiseState ? "add" : "remove"}</span>
                            </div>
                        </div>
                    ))}
                    {showConclusionInput ? conclusion() : null}
                    <button type={"button"}
                            className={!showConclusionInput ? "btn-primary btn py-3 mt-5 w-100" : "btn-outline-success btn py-3 mt-5 w-100"}
                            onClick={() => setShowConclusionInput(!showConclusionInput)}
                            disabled={showConclusionInput}>Add conclusion
                    </button>
                    {showConclusionInput ? (
                        <button type={"button"} className={"btn btn-success mt-5 w-100 py-3"} onClick={() => {
                            setLoading(true)
                            setTimeout(() => {
                                setLoading(false)
                            }, 5000)
                        }}>Check
                            validity</button>) : null}
                </div>
            </div>
        </Layout>
    )
}