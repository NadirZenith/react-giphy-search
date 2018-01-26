import React, {Component} from 'react'

const getObjectFromJson = response => response.json()
const throwIfNotOk = response => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

const sleep = (msecs) => (
    results => new Promise(resolve => setTimeout(() => resolve(results), msecs))
)


export default class GiphySearch extends Component {
  state = {loading: false, error: false, imgSrc: null}

  load = (query) => {
    this.setState({loading: true, error: false})
    const encodedQuery = encodeURIComponent(query)
    const url = `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${encodedQuery}`
    fetch(url)
        .then(throwIfNotOk)
        .then(getObjectFromJson)
        .then(sleep(1000))
        .then(response => {
          this.setState({
            loading: false,
            imgSrc: response.data.fixed_height_downsampled_url,
          })
        })
        .catch(error => this.setState({loading: false, error: true}))
  }

  componentDidMount() {
    if (this.props.initialQuery) {
      this.load(this.props.initialQuery)
    }
  }

  render() {
    const {loading, error, imgSrc} = this.state
    const {initialQuery} = this.props

    const onSubmit = ev => {
      ev.preventDefault()
      const query = ev.target.elements.query.value
      this.load(query)
    }

    return (
        <div>
          <section>
            <form onSubmit={onSubmit}>
              Enter a word or phrase:
              <input type="text" name="query" defaultValue={initialQuery}/>
              <button type="submit">Search</button>
            </form>
          </section>
          <br/>

          <section>
            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {!loading && !error && !imgSrc &&
            <div>
              No Results Found
            </div>}
            {!loading && !error && imgSrc &&
            <div>
              <img src={imgSrc}/>
            </div>}
          </section>
        </div>
    )
  }
}
