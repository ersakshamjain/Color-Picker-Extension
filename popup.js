const btn = document.querySelector('.changecolorBtn');
let colorGrid = document.getElementById('colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab);

       chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    }, async (injectionResult) => {
        const [data] = injectionResult;    // Destructuring
        if (data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            
            try {

                await lnavigator.clipboard.writeText(color);
            } catch (err) {
                console.error(err);
            }

            console.log(colorGrid);
        }
        else {
            console.log('null');
        }
    });
});

async function pickColor() {
    try {
        //picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open(); // return selected color
        // console.log(selectedColor);

    } catch (err) {
        console.log(err);
    }
} 