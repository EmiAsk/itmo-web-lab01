export class Client {
    submit(formData) {
        return fetch(
            "/php/submit.php",
            {
                method: "POST",
                body: formData
            }
        )
            .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(`${response.status}: ${response.statusText}. Something went wrong`)
                }
            )
    }
}



