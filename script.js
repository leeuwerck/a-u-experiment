const { includes, get, last, random, repeat, sampleSize, shuffle, snakeCase, some } = _

const RED = { colorName: "red", rgb: "rgb(255, 0, 0, 0.2)" }
const BLUE = { colorName: "blue", rgb: "rgb(0, 0, 255, 0.2)" }
const BRIGHT_GREEN = { colorName: "greenyellow", rgb: "rgb(0, 255, 0, 0.2)" }
const YELLOW = { colorName: "yellow", rgb: "rgb(255, 255, 0, 0.2)" }
const ORANGE = { colorName: "orange", rgb: "rgb(255, 165, 0, 0.2)" }
const PURPLE = { colorName: "purple", rgb: "rgb(128, 0, 128, 0.2)" }
const SKY_BLUE = { colorName: "skyblue", rgb: "rgb(135, 206, 235, 0.2)" }
const GREY = { colorName: "grey", rgb: "rgb(128, 128, 128, 0.2)" }
const colors = [RED, BLUE, BRIGHT_GREEN, YELLOW, ORANGE, PURPLE, SKY_BLUE, GREY]
const shuffledAccuracyTips = shuffle([
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
])

const SCREEN_SIZE = 1000
const SCREEN_CENTER = [500, 500]
const DOT_COUNT = 68
const DOT_RADIUS = 15
const DOT_OVERLAP_FACTOR = 3
const SCREEN_CIRCLE_MARGIN = 30
const CHOICE_DOT_RADIUS = 200
const INITIAL_LOWER_COLOR_COUNT = 1 // :35
const STAIRCASE_STEP_COUNT = 15 // 30
const EXPERIMENT_STEP_COUNT = 40 // 80

const isTrial = includes(window.location.href.split("#"), "trial")
const skipFirstPart = includes(window.location.href.split("#"), "skip_first_part")

const DOTS_CIRCLE_DISPLAY_DURATION = isTrial ? 360 : 1600 // actual duration is managed using css animation
const POST_CHOICE_DELAY = isTrial ? 100 : 1000

let shuffledColorPair
let listeningToLeftRightKeyboardChoice
let listeningToSpaceKeyboardChoice

let lowerColorCount

let results = !skipFirstPart
  ? []
  : [
      // for testing purpose
      {
        lowerColorCount: 1,
        lowerCountColor: "blue",
        higherCountColor: "orange",
        staircaseChosenColor: "orange",
      },
      {
        lowerColorCount: 3,
        lowerCountColor: "purple",
        higherCountColor: "skyblue",
        staircaseChosenColor: "skyblue",
      },
      {
        lowerColorCount: 5,
        lowerCountColor: "yellow",
        higherCountColor: "purple",
        staircaseChosenColor: "purple",
      },
      {
        lowerColorCount: 7,
        lowerCountColor: "red",
        higherCountColor: "greenyellow",
        staircaseChosenColor: "greenyellow",
      },
      {
        lowerColorCount: 9,
        lowerCountColor: "grey",
        higherCountColor: "purple",
        staircaseChosenColor: "purple",
      },
      {
        lowerColorCount: 11,
        lowerCountColor: "purple",
        higherCountColor: "skyblue",
        staircaseChosenColor: "purple",
      },
      {
        lowerColorCount: 10,
        lowerCountColor: "red",
        higherCountColor: "blue",
        staircaseChosenColor: "red",
      },
      {
        lowerColorCount: 9,
        lowerCountColor: "greenyellow",
        higherCountColor: "yellow",
        staircaseChosenColor: "yellow",
      },
      {
        lowerColorCount: 11,
        lowerCountColor: "orange",
        higherCountColor: "blue",
        staircaseChosenColor: "blue",
      },
      {
        lowerColorCount: 13,
        lowerCountColor: "orange",
        higherCountColor: "grey",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 15,
        lowerCountColor: "greenyellow",
        higherCountColor: "orange",
        staircaseChosenColor: "orange",
      },
      {
        lowerColorCount: 17,
        lowerCountColor: "greenyellow",
        higherCountColor: "red",
        staircaseChosenColor: "red",
      },
      {
        lowerColorCount: 19,
        lowerCountColor: "yellow",
        higherCountColor: "grey",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 21,
        lowerCountColor: "greenyellow",
        higherCountColor: "purple",
        staircaseChosenColor: "purple",
      },
      {
        lowerColorCount: 23,
        lowerCountColor: "purple",
        higherCountColor: "orange",
        staircaseChosenColor: "orange",
      },
      {
        lowerColorCount: 25,
        lowerCountColor: "greenyellow",
        higherCountColor: "grey",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 27,
        lowerCountColor: "red",
        higherCountColor: "purple",
        staircaseChosenColor: "red",
      },
      {
        lowerColorCount: 26,
        lowerCountColor: "yellow",
        higherCountColor: "orange",
        staircaseChosenColor: "orange",
      },
      {
        lowerColorCount: 28,
        lowerCountColor: "greenyellow",
        higherCountColor: "orange",
        staircaseChosenColor: "orange",
      },
      {
        lowerColorCount: 30,
        lowerCountColor: "purple",
        higherCountColor: "grey",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 32,
        lowerCountColor: "greenyellow",
        higherCountColor: "grey",
        staircaseChosenColor: "greenyellow",
      },
      {
        lowerColorCount: 31,
        lowerCountColor: "purple",
        higherCountColor: "red",
        staircaseChosenColor: "red",
      },
      {
        lowerColorCount: 33,
        lowerCountColor: "blue",
        higherCountColor: "grey",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 33,
        lowerCountColor: "purple",
        higherCountColor: "skyblue",
        staircaseChosenColor: "skyblue",
      },
      {
        lowerColorCount: 33,
        lowerCountColor: "blue",
        higherCountColor: "yellow",
        staircaseChosenColor: "blue",
      },
      {
        lowerColorCount: 32,
        lowerCountColor: "red",
        higherCountColor: "skyblue",
        staircaseChosenColor: "skyblue",
      },
      {
        lowerColorCount: 33,
        lowerCountColor: "grey",
        higherCountColor: "yellow",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 32,
        lowerCountColor: "blue",
        higherCountColor: "red",
        staircaseChosenColor: "red",
      },
      {
        lowerColorCount: 33,
        lowerCountColor: "purple",
        higherCountColor: "grey",
        staircaseChosenColor: "grey",
      },
      {
        lowerColorCount: 33,
        lowerCountColor: "orange",
        higherCountColor: "purple",
        staircaseChosenColor: "orange",
      },
    ]

const dotsCircle = document.getElementById("dots_circle")
const colorChoices = document.getElementById("color_choices")
const tipExplanation = document.getElementById("tip_explanation")
const leftTip = document.getElementById("left_tip")
const rightTip = document.getElementById("right_tip")
const leftCircleOfPair = document.getElementById("left_circle_choice")
const rightCircleOfPair = document.getElementById("right_circle_choice")

const getRandomCoordinates = () => [random(0, SCREEN_SIZE), random(0, SCREEN_SIZE)]

const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

const areOverlapping = (x1, y1, x2, y2, commonRadius) => {
  const distance = getDistance(x1, y1, x2, y2)
  return distance <= commonRadius * DOT_OVERLAP_FACTOR
}

const isOutOfCircle = (x1, x2) => {
  const distance = getDistance(x1, x2, SCREEN_CENTER[0], SCREEN_CENTER[1])
  return distance > SCREEN_CENTER[0] - DOT_RADIUS - SCREEN_CIRCLE_MARGIN
}

function drawDotsCircle(colorPair, lowerCount) {
  dotsCircle.innerHTML = ""

  const enclosingCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  enclosingCircle.setAttribute("cx", 500)
  enclosingCircle.setAttribute("cy", 500)
  enclosingCircle.setAttribute("r", 496)
  enclosingCircle.setAttribute("fill", "white")
  enclosingCircle.setAttribute("stroke", "black")
  enclosingCircle.setAttribute("strokeWidth", 4)
  dotsCircle.appendChild(enclosingCircle)

  let coordinates = []
  for (i = 0; i < DOT_COUNT; i++) {
    if (!coordinates[0]) {
      do {
        coordinates[0] = getRandomCoordinates()
      } while (isOutOfCircle(coordinates[0][0], coordinates[0][1]))
    } else {
      let newCircleCoordinatePair = getRandomCoordinates()
      while (
        some(
          coordinates,
          (pair) =>
            areOverlapping(pair[0], pair[1], newCircleCoordinatePair[0], newCircleCoordinatePair[1], DOT_RADIUS) ||
            isOutOfCircle(newCircleCoordinatePair[0], newCircleCoordinatePair[1])
        )
      ) {
        newCircleCoordinatePair = getRandomCoordinates()
      }
      coordinates.push(newCircleCoordinatePair)
    }
  }

  coordinates.forEach((pair, index) => {
    let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    newCircle.setAttribute("cx", pair[0])
    newCircle.setAttribute("cy", pair[1])
    newCircle.setAttribute("r", DOT_RADIUS)
    newCircle.setAttribute("fill", colorPair[index < getLowerColorCount() ? 0 : 1])
    dotsCircle.appendChild(newCircle)
  })
}

function drawCirclePair({ left, right }) {
  leftCircleOfPair.innerHTML = ""
  rightCircleOfPair.innerHTML = ""

  const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  newCircle.setAttribute("cx", 500)
  newCircle.setAttribute("cy", 500)
  newCircle.setAttribute("r", CHOICE_DOT_RADIUS)
  newCircle.setAttribute("fill", left.rgb)
  newCircle.setAttribute("data-color", left.colorName)
  newCircle.setAttribute("class", "shadow")
  leftCircleOfPair.appendChild(newCircle)
  leftCircleChoice = newCircle

  const newCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  newCircle2.setAttribute("cx", 500)
  newCircle2.setAttribute("cy", 500)
  newCircle2.setAttribute("r", CHOICE_DOT_RADIUS)
  newCircle2.setAttribute("fill", right.rgb)
  newCircle2.setAttribute("data-color", right.colorName)
  newCircle2.setAttribute("class", "shadow")
  rightCircleOfPair.appendChild(newCircle2)
}

function updateAndGetLowerColorCount() {
  if (results.length === 0) {
    lowerColorCount = INITIAL_LOWER_COLOR_COUNT
  } else {
    if (last(results).staircaseChosenColor === last(results).higherCountColor) {
      lowerColorCount = lowerColorCount + 2
      if (lowerColorCount > 33) lowerColorCount = 33
    } else {
      lowerColorCount = lowerColorCount - 1
      if (lowerColorCount < 1) lowerColorCount = 1
    }
  }
  console.log("%c" + repeat(" ", lowerColorCount) + "▲", `color: ${last(results)?.staircaseChosenColor}`)
  return lowerColorCount
}

function getLowerColorCount() {
  return lowerColorCount ? lowerColorCount : 33
}

function getColorPair() {
  return sampleSize(colors, 2)
}

function startExperiment() {
  if (!isTrial) {
    window.onbeforeunload = function () {
      return "Des données seront perdues en fermant cette page. Fermer la page&nbsp;?"
    }
    const elem = document.body
    // elem.requestPointerLock()
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen()
    }
  }

  startNextStaircaseStep()
}

function startNextStaircaseStep() {
  const colorPair = getColorPair()
  const lowerColorCount = updateAndGetLowerColorCount()
  const lowerCountColor = colorPair[0]
  const higherCountColor = colorPair[1]
  results = [
    ...results,
    { lowerColorCount, lowerCountColor: lowerCountColor.colorName, higherCountColor: higherCountColor.colorName },
  ]
  drawDotsCircle([lowerCountColor.rgb, higherCountColor.rgb], lowerColorCount)

  const [left, right] = shuffle(colorPair)
  shuffledColorPair = { left, right }
  drawCirclePair(shuffledColorPair)

  showDotsCircle()

  setTimeout(() => {
    showColorChoice()
  }, DOTS_CIRCLE_DISPLAY_DURATION + 500)
}

function showDotsCircle() {
  dotsCircle.style.display = "block"
  dotsCircle.style.visibility = "visible"
  setTimeout(() => {
    dotsCircle.style.visibility = "hidden"
    dotsCircle.style.display = "none"
  }, DOTS_CIRCLE_DISPLAY_DURATION)
}

function showColorChoice(tipAccuracy, isTipAccurate) {
  colorChoices.style.display = "flex"
  colorChoices.style.visibility = "visible"
  if (tipAccuracy) {
    document.getElementById("tips").style.display = "flex"
    last(results).higherCountColor === shuffledColorPair.left.colorName && isTipAccurate
      ? highLightChoice("left")
      : highLightChoice("right")
  }
  listeningToLeftRightKeyboardChoice = true
}

function highLightChoice(side) {
  document.getElementById(`${side}_tip`).style.visibility = "visible"
}

function clickColor(element) {
  chooseColor(element.children[0].dataset.color)
}

function chooseColor(color) {
  hideColorChoice()

  last(results).correctChoiceSide =
    last(results).higherCountColor === shuffledColorPair.left.colorName ? "left" : "right"

  if (results.length < (isTrial ? 3 : STAIRCASE_STEP_COUNT)) {
    last(results).staircaseChosenColor = color
    setTimeout(() => {
      startNextStaircaseStep()
    }, POST_CHOICE_DELAY)
  } else if (results.length === (isTrial ? 3 : STAIRCASE_STEP_COUNT)) {
    last(results).staircaseChosenColor = color
    showContinueDialog()
  } else if (!last(results).firstGuessedColor) {
    last(results).firstGuessedColor = color
    setTimeout(() => {
      showConfidenceLikertScale()
    }, POST_CHOICE_DELAY)
  } else if (results.filter((r) => r.firstGuessedColor).length === (isTrial ? 2 : EXPERIMENT_STEP_COUNT - 1)) {
    last(results).secondGuessedColor = color
    showFinishDialog()
  } else {
    last(results).secondGuessedColor = color
    setTimeout(() => {
      startNextExperimentStep()
    }, POST_CHOICE_DELAY)
  }
}

function rateConfidence() {
  hideLikertScale()
  const level = document.querySelector('input[name="confidenceLevel"]:checked').value
  last(results).confidenceLevel = level

  setTimeout(() => {
    last(results).secondGuess ? startNextExperimentStep() : showTip()
  }, POST_CHOICE_DELAY)
}

function hideColorChoice() {
  colorChoices.style.visibility = "hidden"
  colorChoices.style.display = "none"
  tipExplanation.style.display = "none"
  tipExplanation.style.visibility = "hidden"
  leftTip.style.visibility = "hidden"
  rightTip.style.visibility = "hidden"
}

function listeningToKeyboard() {
  return listeningToLeftRightKeyboardChoice || listeningToSpaceKeyboardChoice
}

document.addEventListener("keydown", (event) => {
  if (!listeningToKeyboard()) return

  if (listeningToLeftRightKeyboardChoice && event.code === "ArrowLeft") {
    listeningToLeftRightKeyboardChoice = false
    chooseColor(shuffledColorPair.left.colorName)
  } else if (listeningToLeftRightKeyboardChoice && event.code == "ArrowRight") {
    listeningToLeftRightKeyboardChoice = false
    chooseColor(shuffledColorPair.right.colorName)
  } else if (listeningToSpaceKeyboardChoice && event.code === "Space") {
    event.stopPropagation()
    event.preventDefault()
    listeningToSpaceKeyboardChoice = false
    rateConfidence()
  }
})

function showContinueDialog() {
  document.getElementById("continue_dialog").showModal()
}

function showFinishDialog() {
  document.getElementById("finish_dialog").showModal()
}

function startNextExperimentStep() {
  const colorPair = getColorPair()
  const lowerColorCount = getLowerColorCount()
  const lowerCountColor = colorPair[0]
  const higherCountColor = colorPair[1]
  results = [
    ...results,
    { lowerColorCount, lowerCountColor: lowerCountColor.colorName, higherCountColor: higherCountColor.colorName },
  ]
  drawDotsCircle([lowerCountColor.rgb, higherCountColor.rgb], lowerColorCount)

  const [left, right] = shuffle(colorPair)
  shuffledColorPair = { left, right }

  drawCirclePair(shuffledColorPair)
  showDotsCircle()

  setTimeout(() => {
    showColorChoice()
  }, DOTS_CIRCLE_DISPLAY_DURATION + 1000)
}

function showConfidenceLikertScale() {
  listeningToSpaceKeyboardChoice = true
  document.getElementById("likert").style.display = "flex"
  document.getElementById("mean_likert_value").checked = true
  document.getElementById("mean_likert_value").focus()
}

function hideLikertScale() {
  document.getElementById("likert").style.display = "none"
}

function showTip() {
  tipExplanation.style.display = "block"
  tipExplanation.style.visibility = "visible"

  const isTipAccurate = shuffledAccuracyTips[results.filter(({ firstGuessedColor }) => firstGuessedColor).length - 1]
  last(results).isTipAccurate = isTipAccurate
  showColorChoice(true, isTipAccurate)
}

function displayResults() {
  delete window.onbeforeunload
  document.exitFullscreen()
  // document.exitPointerLock()

  subjectId = document.getElementsByName("subject_id")[0].value || "missing_subject_id"

  const responsesToDownload = formatResponses(subjectId)

  document.getElementById("responses").value = responsesToDownload

  document.getElementById("results_container").style.display = "flex"
  document.getElementById("results_container").style.visibility = "visible"

  localStorage.setItem(subjectId + "_" + new Date().toISOString(), responsesToDownload)

  let downloadElement = document.createElement("a")
  downloadElement.setAttribute("href", "data:attachment/csv" + "," + encodeURI(responsesToDownload))

  downloadElement.setAttribute("download", "responses_" + subjectId + ".csv")

  downloadElement.style.display = "none"
  document.body.appendChild(downloadElement)

  setTimeout(() => {
    if (!isTrial) downloadElement.click()
  }, 1000)
}

function formatResponses(subjectId) {
  const attributes = [
    "lowerColorCount",
    "lowerCountColor",
    "higherCountColor",
    "correctChoiceSide",
    "staircaseChosenColor",
    "firstGuessedColor",
    "confidenceLevel",
    "isTipAccurate",
    "secondGuessedColor",
  ]
  return `${["subjectId", ...attributes].map(snakeCase).join(", ")}
${results.map((line) => [subjectId, ...attributes.map((key) => get(line, key, ""))].join(", ")).join("\n")}`
}

if (skipFirstPart) {
  document.getElementById("start_dialog").style.display = "none"
  startNextExperimentStep()
}
