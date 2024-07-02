import { Button } from "react-bootstrap"



export function Menu(props) {










  let titleMessage = "\nWelcome to Movie battle!\n\nThe point of the game is to name successive movies that are linked by prominent cast or crew members.\n\nEach player can ban 3 people (AKA links) for their opponent at the start of the match.\nRepeat movie titles cannot be used, and links can only be used up to three times. \nPlayers have 40 seconds each to make a valid guess, or they're out! \n\nEveryone has three lifelines (one-use only): \nskip = skips your turn. \ninfo = displays cast & crew of current movie. \ntime = adds 30 seconds to the timer."



  return (
    <div className="movie-menu">
      <h5>{titleMessage}</h5>

      <Button onClick={props.startGame}>Start Match</Button>
    </div>
  )
}