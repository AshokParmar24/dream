import React, {useState} from "react";
import {Input,Checkbox ,Radio ,Button } from "antd";

const Information=()=>{
    const [data,setData]=useState({
        email:"",
        password:"",
        gender:"",
        language:[],
        car:""
    })
    const [list,setList]=useState([])
    const [editeIndex,setEditIndex]=useState(-1)
    const [error,setError]=useState({})
    const handleChange = (e) =>{
        const {name,value,type}=e.target
        if(type==="checkbox"){
            if(data.language.includes(value)){
                const clearData=data.language.filter((v)=>v!==value)
                setData({...data,language:clearData})
            }
            else{
                setData({...data,language: [...data.language,value]})
            }

        }else {
            setData({...data, [name]: value})
        }
    }
    const onDelete = (index) =>{
        // this method also delete one element
        // list.splice(index,1)
        // setList([...list])

        // second that is also delete method
        const deleteData =list.filter((v,i)=>i!==index)
        setList(deleteData)
        setEditIndex(index)
    }

    const formValidation=(key,value)=>{
        switch (key){
            case 'email':{
                if(!value){
                    return "enter a email"
                }
                return ''
            }
            case 'password':{
                if(!value){
                    return "enter a password"
                }
                return ''
            }
            case 'gender':{
                if(!value){
                    return "enter a gender"
                }
                return ''
            }
            case 'language':{
                if(!Array.isArray(value)){
                    return "enter a language"
                }
                return ''
            }
            case 'car':{
                if(value){
                    return "enter a car"
                }
                return ''
            }
            default:return ''
        }
    }
    const onEdit=(index)=>{
        const editeRow =list.find((value,id)=> index===id)
        setData(editeRow)
        setEditIndex(index)
    }
    const onSubmit= () =>{
        const dataValidation={}
        Object.keys(data).map((key)=>{
            const keyError =formValidation(key,data[key])
            if(keyError){
                dataValidation[key]=keyError
            }
        })
        if(Object.keys(dataValidation).length){
            setError(dataValidation)
        }
        else {
            if (editeIndex !== -1) {
                const addData = list.map((value, index) => {
                    if (index === editeIndex) {
                        return data;
                    }
                    return value;
                });
                setList(addData);
            } else {
                setList([...list, data])
            }
        }

        setData({
            email:"",
            password:"",
            gender:"",
            language:[],
            car:""
        })
        console.log("error",error)
        setEditIndex(-1 )
    }
    return(
        <div className="flex text-center flex-col w-[700px] m-auto">
            <div className="text-center text-2x">INFORMATION</div>

            <Input
                className="text-xl border border-solid border-solid-red"
                name="email"
                type="text"
                value={data.email}
                onChange={handleChange }
            />
            {error.email?'':<div>{error.email}</div>}
            <br />
            <Input
                className="text-xl border border-solid border-solid-red"
                name="password"
                type="text"
                value={data.password}
                onChange={handleChange }
            />
            <div>
                <div>Gender</div>
                <Radio.Group  onChange={handleChange } value={data.gender}  name="gender"  type="radio">
                    <Radio
                        className="text-xl"
                        value="male"
                        checked={data.gender==="male"}
                    >male</Radio>

                    <Radio
                        className="text-xl"
                        value="female"
                        onChange={handleChange }
                        checked={data.gender==="female"}
                    >female</Radio>
                </Radio.Group>
            </div>
            <div>
                <div>select you knowledge language</div>
                <div>
                    <Checkbox
                        className="text-xl"
                        name="language"
                        type="checkbox"
                        value='HTML'
                        onChange={handleChange }
                        checked={data.language.includes("HTML")}

                    />HTML
                    <Checkbox
                        className="text-xl"
                        name="language"
                        type="checkbox"
                        value='CSS'
                        onChange={handleChange }
                        checked={data.language.includes("CSS")}

                    />CSS
                    <Checkbox
                        className="text-xl"
                        name="language"
                        type="checkbox"
                        value='JAVA SCRIPT'
                        onChange={handleChange }
                        checked={data.language.includes("JAVA SCRIPT")}

                    />JAVA_SCRIPT
                    <Checkbox
                        className="text-xl"
                        name="language"
                        type="checkbox"
                        value='REACT'
                        onChange={handleChange }
                        checked={data.language.includes("REACT")}
                    />REACT
                </div>
                <select name="car"  onChange={handleChange}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div>
                <Button className="bg-green-200 text-green-800 w-[10vw]"
                        type="submit"
                        onClick={onSubmit}>
                    Submit
                </Button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>email</th>
                    <th>password</th>
                    <th>gender</th>
                    <th>language</th>
                    <th>car</th>
                    <th>DELETE/EDIT</th>
                </tr>
                </thead>
                <tbody>
                {
                    (list || []).map((value,index)=>{
                        return(
                            <tr key={index}>
                                <td>{value.email}</td>
                                <td>{value.password}</td>
                                <td>{value.gender}</td>
                                <td>{value.language.map((v)=>{
                                    return v
                                })}</td>
                                <td>{value.car}</td>
                                <th>
                                    <Button className="bg-green-200 text-green-800 w-[5vw]" onClick={()=>onDelete(index)}>DELETE</Button>
                                    <Button className="bg-green-200 text-green-800 w-[5vw]" onClick={()=>onEdit(index)}>EDIT</Button>
                                </th>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    )
}
export default Information