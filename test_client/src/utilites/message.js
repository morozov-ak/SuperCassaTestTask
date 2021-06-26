
export const message = (mes) => {
    if (!document.getElementById('popup_container')) {
        let div = document.createElement('div')
        div.id = "popup_container"
        document.getElementById('root').append(div)
    }
    let div = document.createElement('div')
    div.id = "snackbar"
    div.className = "show"
    div.textContent = mes;
    document.getElementById('popup_container').append(div)

    setTimeout(() => {
        div.remove()
        if (document.getElementById('popup_container') && !document.getElementById('popup_container').children.length) { document.getElementById('popup_container').remove() }
    }, 3000)

}