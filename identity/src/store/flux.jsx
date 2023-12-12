import { json } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			
			getToken: async (token) => {
				
				try{
					
					// fetching data from the backend}
					console.log("token es"+token)
					const resp = await fetch( import.meta.env.VITE_BACKEND_URL+"api/test", 
						{method: "POST",
						body: JSON.stringify({"token":token}),
						headers: {
						  "Content-Type": "application/json",
						}})
						
					const data = await resp.json()	
					//console.log(data)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
		}
	};
};

export default getState;