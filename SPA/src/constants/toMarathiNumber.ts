


const toMarathiNumber = (num: number | string) => {
    const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map((d: string) => marathiDigits[parseInt(d)]).join('');
};


export default toMarathiNumber
