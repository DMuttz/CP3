import React, { Component, Fragment } from 'react';

class QuoteGenerator extends Component {
    
    constructor() {
        super();
        this.state = {
            quote: {
            content: '',
            link: '',
            title: ''
        },
        hasQuote: false,
    }
        this.END_POINT = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=5' 
    }

    getRandomQuote = event => {
        fetch(this.END_POINT)
        .then(response => response.json())
        .then(data => {
        if(data[0].content && data[0].title && data[0].link) {
            let { quote } = this.state;
            let quoteData = data[0];
            quote.content = quoteData.content;
            quote.link = quoteData.link;
            quote.title = quoteData.title;
            this.setState({ quote }, () => {
            if(this.state.hasQuote === false) {
                this.setState({ hasQuote: true})
        } 
        })
    } else {
        return console.error('No quote has been found 404')
    }
})
    }

    renderQuote = () => {
        const { title, content,} = this.state.quote;
        return (
            <a>
                <h1>"{content}"</h1>
                 - {title}
                
                </a>
        )
    }

    render() {
        const { hasQuote } = this.state;
        return (
        <Fragment>
        <h1> Quote of the Day </h1>
        <button onClick={this.getRandomQuote}>
        Click Here for Quote of the Day
        </button>
        {hasQuote === true ?  
            this.renderQuote()
            : ''}
        </Fragment>
        ) 
    }
}

export default QuoteGenerator;