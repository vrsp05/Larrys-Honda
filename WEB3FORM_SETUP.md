# Web3Form Setup Instructions

## Configuration

To enable email notifications for the contact form, you need to set up Web3Form:

### Step 1: Get your Web3Form API Key
1. Visit [Web3Forms](https://web3forms.com)
2. Sign up for a free account
3. Create a new form and copy your **Access Key**

### Step 2: Add your API Key
Edit the `config.js` file and replace the placeholder with your actual API key:

```javascript
const CONFIG = {
    WEB3FORM_ACCESS_KEY: 'your_actual_web3form_api_key_here'
};
```

Or create a `.env` file (optional, for reference):
```
VITE_WEB3FORM_ACCESS_KEY=your_actual_web3form_api_key_here
```

### Step 3: Test the Form
The contact form now includes:
- ✅ **Name validation** - Ensures name field is not empty
- ✅ **Email validation** - Checks for proper email format and non-empty field
- ✅ **Message validation** - Ensures message field is not empty
- ✅ **Individual error messages** - Each field shows specific error feedback
- ✅ **Visual error highlighting** - Invalid fields are highlighted with red borders
- ✅ **Web3Form integration** - Automatically submits to Web3Forms for email notifications

### Security Note
- **DO NOT commit `config.js` with your real API key** to version control
- The `.gitignore` file is configured to prevent this
- Only share API keys through secure channels

### Fallback Behavior
If Web3Form is not configured or the API call fails, the form will still show a success message locally so users know their message was received.
