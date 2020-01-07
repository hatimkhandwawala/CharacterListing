import React from 'react';
import './App.css';
import Moment from 'react-moment';
import CharacterService from './Services/CharacterService';

interface IAppStore {
  info: IInfo | undefined,
  Characters: ICharacter[],
  Species: string[],
  Gender: string[],
  Origin: string[],
  SelectedGender: string[],
  SelectedSpecies: string[],
  SelectedOrigin: string[]
}

interface IInfo {
  count: number,
  pages: number,
  next: string,
  prev: string
}

interface ICharacter {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: {
    name: string,
    url: string
  },
  location: {
    name: string,
    url: string
  },
  image: string,
  episode: string[],
  url: string,
  created: Date
}

interface IAppProps {

}

class App extends React.Component<IAppProps, IAppStore>
{
  constructor(props: IAppProps) {
    super(props);

    this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handelNext = this.handelNext.bind(this);
    this.handelPrev = this.handelPrev.bind(this);

    this.state = {
      info: undefined,
      Characters: [],
      Gender: [],
      Species: [],
      Origin: [],
      SelectedGender: [],
      SelectedSpecies: [],
      SelectedOrigin: []
    };
  }

  public render() {

    const characters = this.FilterCharacters();

    const isFilterApplied = this.state.SelectedGender.length > 0 || this.state.SelectedOrigin.length > 0 || this.state.SelectedSpecies.length > 0;
    return (
      <div className="content">

        <h1> CHARACTER LISTING</h1>

        <div className="containerFluid">

          <div className="FilterWrapper">

            <h2>Filters</h2>
            <div className="filterOption">
              <div className="filterOptionHeader">Species</div>
              <div>
                {this.state.Species.map((species: any) => (
                  <div><input type="checkbox" title={species} value={species} onChange={this.handleChangeSpecies} /> {species} <br /></div>
                ))}
              </div>
            </div>

            <div className="filterOption">
              <div className="filterOptionHeader">Gender</div>
              <div>
                {this.state.Gender.map((gender: any) => (
                  <div><input type="checkbox" title={gender} value={gender} onChange={this.handleChangeGender} /> {gender} <br /></div>
                ))}
              </div>
            </div>

            <div className="filterOption">
              <div className="filterOptionHeader">Origin</div>
              <div>
                {this.state.Origin.map((origin: any) => (
                  <div><input type="checkbox" title={origin} value={origin} onChange={this.handleChangeOrigin} /> {origin} <br /></div>
                ))}
              </div>
            </div>
          </div>

          <div className="charactersWraper">


            {isFilterApplied ?
              <div className="selectedFilterWrapper">
                <h2>Selected Filter</h2>

                <div className="selectedFilter">

                  {this.state.SelectedSpecies.map((species: any) => (
                    <div className="filterItem">{species}</div>
                  ))}

                  {this.state.SelectedOrigin.map((origin: any) => (
                    <div className="filterItem">{origin}</div>
                  ))}


                  {this.state.SelectedGender.map((gender: any) => (
                    <div className="filterItem">{gender}</div>
                  ))}

                </div>
              </div>
              : <></>}

            <div className="sortWrapper">
              <select id="sortCharacters" onChange={this.handleChangeSort}>
                <option value="-1">Sort By Id</option>
                <option value="0">Assending</option>
                <option value="1">Desending</option>
              </select>
            </div>

            <div className="recordCount">
              <h3> Showing {characters.length} Characters of {this.state.info?.count}</h3>

              <div className="pagination">
                <input type="button" value="Previous" disabled={this.state.info?.prev === ""} onClick={this.handelPrev} />
                <input type="button" value="Next"  disabled={this.state.info?.next === ""} onClick={this.handelNext}/>
              </div>
            </div>

            {characters.map((character: any) => (

              <div className="character">
                <img className="characterImage" src={character.image} alt="Logo" />

                <div className="characterMetaData">
                  <h4>{character.name}</h4>
                  <div>
                    <div> id:</div>
                    <div> {character.id}</div>
                  </div>
                  -
                  <div>
                    <div> Created:</div>
                    <div> <Moment fromNow>{character.created}</Moment> </div>
                  </div>
                </div>

                <div className="characterDetails">
                  <div className="characterDetails-set" >
                    <div className="label"> STATUS</div>
                    <div className="label-Value"> {character.status}</div>
                  </div>

                  <div className="characterDetails-set" >
                    <div className="label"> SPECIES</div>
                    <div className="label-Value"> {character.species}</div>
                  </div>

                  <div className="characterDetails-set" >
                    <div className="label"> GENDER</div>
                    <div className="label-Value"> {character.gender}</div>
                  </div>

                  <div className="characterDetails-set" >
                    <div className="label"> ORIGIN</div>
                    <div className="label-Value"> {character.origin.name}</div>
                  </div>

                  <div>
                    <div className="label"> Last Location</div>
                    <div className="label-Value"> {character.location.name}</div>
                  </div>
                </div>

              </div>

            ))}
          </div>

        </div>

      </div>
    );
  }

  public componentDidMount(): void {
    this.loadCharacters("https://rickandmortyapi.com/api/character/");
    // CharacterService.getCharacters().then((characters) => {

    //   let species: string[] = [];
    //   let gender: string[] = [];
    //   let origin: string[] = [];

    //   characters.results.map((character: any) => {

    //     if (!species.includes(character.species)) {
    //       species.push(character.species)
    //     }

    //     if (!gender.includes(character.gender)) {
    //       gender.push(character.gender)
    //     }

    //     if (!origin.includes(character.origin.name)) {
    //       origin.push(character.origin.name)
    //     }

    //   });

    //   this.setState({ "Characters": characters.results, "Species": species, "Gender": gender, "Origin": origin, "info": characters.info });
    // });
  }

  protected handleChangeSpecies(event: any): void {
    const selected = event.target.value;
    const currentIndex = this.state.SelectedSpecies.indexOf(selected);

    let species = this.state.SelectedSpecies;
    if (currentIndex === -1) {
      species.push(selected);
    }
    else {
      species.splice(currentIndex, 1);
    }

    this.setState({ "SelectedSpecies": species });
  }

  protected handleChangeGender(event: any): void {
    const selected = event.target.value;
    const currentIndex = this.state.SelectedGender.indexOf(selected);

    let gender = this.state.SelectedGender;
    if (currentIndex === -1) {
      gender.push(selected);
    }
    else {
      gender.splice(currentIndex, 1);
    }

    this.setState({ "SelectedGender": gender });
  }

  protected handleChangeOrigin(event: any): void {
    const selected = event.target.value;
    const currentIndex = this.state.SelectedOrigin.indexOf(selected);

    let origin = this.state.SelectedOrigin;
    if (currentIndex === -1) {
      origin.push(selected);
    }
    else {
      origin.splice(currentIndex, 1);
    }

    this.setState({ "SelectedOrigin": origin });
  }

  protected handelNext(event: any): void {
    this.loadCharacters(this.state.info?.next);
  }

  protected handelPrev(event: any): void {
    this.loadCharacters(this.state.info?.prev);
  }

  protected handleChangeSort(event: any): void {
    const selected = event.target.value;
    if (selected === "-1") {
      return;
    }
    else if (selected === "0") {
      this.setState({ "Characters": this.state.Characters.sort((a, b) => { return a.id - b.id }) });
    }
    else {
      this.setState({ "Characters": this.state.Characters.sort((a, b) => { return b.id - a.id }) });
    }
  }

  private FilterCharacters(): ICharacter[] {
    const species = this.state.SelectedSpecies;
    const gender = this.state.SelectedGender;
    const origin = this.state.SelectedOrigin;
    let result: ICharacter[] = this.state.Characters;

    if (species.length > 0) {
      result = result.filter(x => species.includes(x.species));
    }

    if (gender.length > 0) {
      result = result.filter(x => gender.includes(x.gender));
    }

    if (origin.length > 0) {
      result = result.filter(x => origin.includes(x.origin.name));
    }
    return result;
  }

  private loadCharacters(url: string | undefined){
    CharacterService.getCharactersFromUrl(url).then((characters) => {

      let species: string[] = [];
      let gender: string[] = [];
      let origin: string[] = [];

      characters.results.map((character: any) => {

        if (!species.includes(character.species)) {
          species.push(character.species)
        }

        if (!gender.includes(character.gender)) {
          gender.push(character.gender)
        }

        if (!origin.includes(character.origin.name)) {
          origin.push(character.origin.name)
        }

      });

      this.setState({ "Characters": characters.results, "Species": species, "Gender": gender, "Origin": origin, "info": characters.info });
    });
  }
}

export default App;