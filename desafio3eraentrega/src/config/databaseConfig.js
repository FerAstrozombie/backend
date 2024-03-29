import {envConfig} from "../envConfig.js"

const options = {
    mongoDB: 
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    },
    firebase: 
    {
        "type": "service_account",
        "project_id": "ecommercebackend-44699",
        "private_key_id": "2b3af73970a6fa15e52aee831adc56b8ed54b470",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/ljA9f8tHVqwi\nvY5W6g0KebLC/Ug538XDejNgVnnuVegyCp7L0/j6ZBH60iDkq1mkFZVawK2kJQie\n7MbECiwl3aoqKYBlGYDU4sgYC176Q1VqDV48rrk4LA00kX3jO41vwO05zxv/EcnM\njDF7EoU/11/hEZkJ1gTLaLjUwIUZUmjSYjDnEQmrXdw/o1a82Ipwf4nITtHWY7l4\nAo6CyF+DkNUW+JkUZp3AhnKO4hv3aWmCz72woPxzXlz1hKEAPRkNqk/qctiKsED3\nJusRXm+W0oFYYeTUx4vcCbmfSipxS7AK/0QQVDZRR7OBdct+1Uu16KXuUZDU7cob\nNxkS0ZGRAgMBAAECggEAHvNJBnEMtTuf7K9+vTUWYj4teNP+GmC3dtAuWJPfzXb8\ntIjZWnL7Yp1Ookcr9S+7+DFcbXV5wm4RKct1Li+5Lhd/PqHHEji/1/nC+s9rdTac\n0oMnrtnzJiCdCYRaN/QOR019hWdF+JDhGYr/ELN56fRbPZA1jvc6KGTZ5yoq1l9y\nxvrFk7JI8KgKWro5Skbnpd0A9NYmtNFtjzHeTnaNFurRKRLNsY7JDifOuH4YMxZq\najg8KJxt4v7KapNYKjf/Vrnt7Q1GNvZhYv+xqRPBuI47hxTxP+ViLswIaXJyXVts\nDU5iN05EoUeBKl5JUS8XDEZL5xtcKZP+LBjXVeKjWQKBgQDsUVeyNGrDkDtrRQ6s\n9eMX7teVd1lE6VZ25YYSxlv0QDVpuWIAUJwGH2kS9aGiWNM5uVGZOk/W3LfjdR7q\nc/3dflnC7uO40H6mqmsuF45cYWt3m61CYSFGEiKo6odLWyN1pxGeSTzB6ZH28RFq\napnReQy81FAFryPYoodiNbazRwKBgQDPixxXoMagkG5wM995pa6/TJb59kpNxuzN\nNE/DQIFaeqJs9s8HsXOUE4uMPlUC3i5OVcS45+pvWdRl9qR7bj50F0V6CL+U+knG\nLU5AhxoDiFMH/yPzVlQG6q9sInPS8/jVcjMzSR58Cm/cue4hnJjGGOEQi5ancpSL\nSQcQy40QZwKBgQDGhzuGQVTkADp6zqQal+N1SrigH4jGRMTX09ED2tKLapm0vQHg\nw9efqSmrvOFSMw8YcmBjusIx/nEZzF3xlwpR1oDwK6Lxs26C865hJXb6kvkmnYk7\nt7+tTzUA9S4+F0293GIHuP0q5t8yNqlr3ixk9y3FQRQNAmq55yiXUAqxpwKBgQC5\n/KX3eSLGvOfbMQExWGKTGCWr9yR7Mqr+8cQQ63uAA6oPD9ZTxJgYuLMziKBSI51H\noeDa+ynBg7StcyvPWOoqyrf+NlzJOspmCC+579hGFiKiZehnppNCZ4mw0+cLworZ\nbK+pY/snmYrJOO3HvTfDPoRieVUW1b18XIMyb9cIPQKBgACx/M6ucTeILXw3bFpM\n53xQVZpq7XAlu0NMtLUZqnl8Q2vypqjRJpyEBuOlJqOTlIjBtsHmwcmEzdX4vh13\neydORsRsgM4cpWRt0aaOYuv4PxtjO7SBWsxOneeoxhEqFvJF0aa+HRv7vGqn3XlK\nmgf1mCgaYFeQ/v97IK7Zak/P\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-zbxub@ecommercebackend-44699.iam.gserviceaccount.com",
        "client_id": "114278013094082288582",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zbxub%40ecommercebackend-44699.iam.gserviceaccount.com"
    },
    mongoAtlasSessions:{
        urlDatabase: `mongodb+srv://${envConfig.KEY_DATABASE}@ecommerce.amqtcgi.mongodb.net/sesionesDB?retryWrites=true&w=majority`,
        urlDatabaseUsers: `mongodb+srv://${envConfig.KEY_DATABASE}@ecommerce.amqtcgi.mongodb.net/users?retryWrites=true&w=majority`,
    }
}

export { options }; 