import React, { useState, useEffect } from "react";


export default function MattText() {
	const [message, setMessage] = useState("");

	useEffect = () => {
		setMessage("You are Matt");
	}


	const getMessage = () => {
		return message;
	}
}

