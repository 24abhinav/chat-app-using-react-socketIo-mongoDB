(function() {
    verifyEmail = (token) => {
        const html = `
            <html>
                <head>
                    <style>
                        div {
                            padding: 20px;
                            text-align: center;
                        }
                
                        div h1 {
                            font-size: 20px;
                            margin-bottom: 40px;
                        }
                
                        div a {
                            text-decoration: none;
                            background: red;
                            padding: 10px;
                            color: white;
                            font-size: 15px;
                            font-weight: 600;
                            letter-spacing: 1px;
                            font-family: monospace;
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <h1>Click the below link to verify your email</h1>
                        <a href="http://localhost:3000/verifyemail/${token}" target="_blank">Verify your email</a>
                    </div>
                </body>
            </html>
        `

        return html;
    }


    module.exports = {
        verifyEmail,
    };

}());
