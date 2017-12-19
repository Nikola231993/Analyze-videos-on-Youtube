var appAngular = angular.module("myTestApplication", []);

var getDeclinationOfTheWord = function(inputName, count) {
  var outputName = "";
  var theLastFigure = count % 10;
  var additionalDeclension = true;

  if (inputName == "second") {
    if (theLastFigure == 1 && count != 11) {
      if (additionalDeclension)
        outputName = "секунда";
      else
        outputName = "секунду";
    } else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "секунд";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "секунды";
  } else if (inputName == "minute") {
    if (theLastFigure == 1 && count != 11) {
      if (additionalDeclension)
        outputName = "минута";
      else
        outputName = "минуту";
    } else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "минут";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "минуты";
  } else if (inputName == "hour") {
    if (theLastFigure == 1 && count != 11)
      outputName = "час";
    else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "часов";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "часа";
  } else if (inputName == "day") {
    if (theLastFigure == 1 && count != 11)
      outputName = "сутки";
    else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "суток";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "сутка";
  } else if (inputName == "week") {
    if (theLastFigure == 1 && count != 11)
      outputName = "неделя";
    else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "недель";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "недели";
  } else if (inputName == "month") {
    if (theLastFigure == 1 && count != 11)
      outputName = "месяц";
    else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "месяцев";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "месяца";
  } else if (inputName == "year") {
    if (theLastFigure == 1 && count != 11)
      outputName = "год";
    else if ((count > 4 && count < 21) || (theLastFigure > 4 && theLastFigure < 10) || (theLastFigure == 0))
      outputName = "лет";
    else if ((theLastFigure > 1) && (theLastFigure < 5))
      outputName = "года";
  }

  return outputName;
}

appAngular.controller('youtubeInfoController', function($scope, $http, $sce) {
  $scope.infoListSortedOne = [];
  $scope.infoListSortedTwo = [];
  $scope.maxCountVideoOnPage = 5;
  $scope.selectedPage = 1;
  $scope.showinfoListSortedOne = [];
  $scope.showinfoListSortedTwo = [];
  $scope.inputSelectedPage = 1;
  $scope.textOutByListOne = "";
  $scope.textOutByListTwo = "";
  $scope.typeSortedListOne = "DatePublished";
  $scope.typeSortedListTwo = "CommentCount";
  $scope.localTextListOne = "";
  $scope.localTextListTwo = "";
  $scope.reverseSortMassiveOne = false;
  $scope.reverseSortMassiveTwo = false;
  $scope.textSortMassiveOne = "По-возрастанию";
  $scope.textSortMassiveTwo = "По-возрастанию";

  $scope.getInfoForOutText = function(listNumber) {
    var outText = "";
    var spisok = [];
    var typeSorted = "";

    switch (listNumber) {
      case 1:
        spisok = $scope.infoListSortedOne;
        typeSorted = $scope.typeSortedListOne;
        break;
      case 2:
        spisok = $scope.infoListSortedTwo;
        typeSorted = $scope.typeSortedListTwo;
        break;
      default:
        console.error("Неизвестное значение переменной listNumber в методе getInfoForOutText: ", listNumber);
    }

    var lenghtSpisok = spisok.length;

    for (var i = 0; i < lenghtSpisok; i++) {
      outText += (i + 1) + ") (" + spisok[i].origDate + ")";

      switch (typeSorted) {
        case "Duration":
          outText += "(" + spisok[i].totalSeconds + ") ";
          break;
        case "CommentCount":
          outText += "(" + spisok[i].commentCount + ") ";
          break;
        case "ViewsCount":
          outText += "(" + spisok[i].viewsCount + ") ";
          break;
        case "LikeCount":
          outText += "(" + spisok[i].likeCount + ") ";
          break;
        case "DizLikeCount":
          outText += "(" + spisok[i].dizLikeCount + ") ";
          break;
        case "DizLikeCount":
          outText += "(" + spisok[i].dizLikeCount + ") ";
          break;
        case "ObjectId":
          outText += "(" + spisok[i].objectId + ") ";
          break;
        case "DatePublished":
          outText += " ";
          break;
        default:
          console.error("Неизвестное значение переменной typeSorted в методе getInfoForOutText: ", typeSorted);
      }

      outText += spisok[i].videoName + " : " + "v=" + spisok[i].VideoId + "& \r";
    }

    return outText;
  }

  $scope.sortMassive = function(inputMass, bySort, reverse) {
    var lenghtSpisok = inputMass.length;
    var replace = false;

    if (bySort == "DatePublished") {
      inputMass = $scope.cloneMassive(videoInfoListSortedByDatePublished);
      if (reverse)
        inputMass = inputMass.reverse();
    } else {
      for (var i = 0; i < lenghtSpisok; i++) {
        for (var j = i; j < lenghtSpisok; j++) {
          switch (bySort) {
            case "Duration":
              if ((inputMass[i].totalSeconds > inputMass[j].totalSeconds && !reverse) ||
                (inputMass[i].totalSeconds < inputMass[j].totalSeconds && reverse))
                replace = true;
              break;
            case "CommentCount":
              if ((inputMass[i].commentCount > inputMass[j].commentCount && !reverse) ||
                (inputMass[i].commentCount < inputMass[j].commentCount && reverse))
                replace = true;
              break;
            case "ViewsCount":
              if ((inputMass[i].viewsCount > inputMass[j].viewsCount && !reverse) ||
                (inputMass[i].viewsCount < inputMass[j].viewsCount && reverse))
                replace = true;
              break;
            case "LikeCount":
              if ((inputMass[i].likeCount > inputMass[j].likeCount && !reverse) ||
                (inputMass[i].likeCount < inputMass[j].likeCount && reverse))
                replace = true;
              break;
            case "DizLikeCount":
              if ((inputMass[i].dizLikeCount > inputMass[j].dizLikeCount && !reverse) ||
                (inputMass[i].dizLikeCount < inputMass[j].dizLikeCount && reverse))
                replace = true;
              break;
            case "ObjectId":
              if ((inputMass[i].objectId > inputMass[j].objectId && !reverse) ||
                (inputMass[i].objectId < inputMass[j].objectId && reverse))
                replace = true;
              break;
            default:
              console.error("Неизвестное значение переменной bySort в методе sortMassive: ", bySort);
          }

          if (replace) {
            var stepElem = inputMass[i];
            inputMass[i] = inputMass[j];
            inputMass[j] = stepElem;
            replace = false;
          }
        }
      }
    }

    return inputMass;
  }

  $scope.cloneMassive = function(inputMass) {
    var mass = [];

    inputMass.forEach(function(item, i, inputMass) {
      mass.push(item);
    });

    return mass;
  }

  $scope.setMassive = function() {
    $scope.infoListSortedOne = $scope.cloneMassive(videoInfoListSortedByDatePublished);
    $scope.infoListSortedTwo = $scope.cloneMassive(videoInfoListSortedByDatePublished);

    var locatedText = ["по длительности", "по количеству комментов", "по количеству просмотров", "по количеству лайков",
      "по количеству дизлайков", "по релевантности", "по дате публикации"
    ];
    var origText = ["Duration", "CommentCount", "ViewsCount", "LikeCount",
      "DizLikeCount", "ObjectId", "DatePublished"
    ];

    $scope.infoListSortedOne = $scope.sortMassive($scope.infoListSortedOne, $scope.typeSortedListOne, $scope.reverseSortMassiveOne);
    $scope.infoListSortedTwo = $scope.sortMassive($scope.infoListSortedTwo, $scope.typeSortedListTwo, $scope.reverseSortMassiveTwo);

    $scope.localTextListOne = locatedText[origText.indexOf($scope.typeSortedListOne)];
    $scope.localTextListTwo = locatedText[origText.indexOf($scope.typeSortedListTwo)];
  }

  $scope.reverseSortMassive = function(listNumber) {
    switch (listNumber) {
      case 1:
        $scope.reverseSortMassiveOne = !$scope.reverseSortMassiveOne;

        if ($scope.reverseSortMassiveOne)
          $scope.textSortMassiveOne = "По-убыванию";
        else
          $scope.textSortMassiveOne = "По-возрастанию";
        break;
      case 2:
        $scope.reverseSortMassiveTwo = !$scope.reverseSortMassiveTwo;

        if ($scope.reverseSortMassiveTwo)
          $scope.textSortMassiveTwo = "По-убыванию";
        else
          $scope.textSortMassiveTwo = "По-возрастанию";
        break;
      default:
        console.error("Неизвестное значение переменной listNumber в методе reverseSortMassive: ", listNumber);
    }

    $scope.setMassive();
    $scope.reloadPage();
  }

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.getCountVideo = function(listNumber) {
    var result = 0;

    switch (listNumber) {
      case 1:
        result = $scope.infoListSortedOne.length;
        break;
      case 2:
        result = $scope.infoListSortedTwo.length;
        break;
      default:
        console.error("Неизвестное значение переменной listNumber в методе getCountVideo: ", listNumber);
    }

    return result;
  }

  $scope.getInfoForStatistic = function(AvgOrSumm, listNumber, DateCount) {
    var summ = 0;
    var spisok = [];
    var result = "";

    switch (listNumber) {
      case 1:
        spisok = $scope.infoListSortedOne;
        break;
      case 2:
        spisok = $scope.infoListSortedTwo;
        break;
      default:
        console.error("Неизвестное значение переменной listNumber в методе getInfoForStatistic: ", listNumber);
    }

    var lenghtSpisok = spisok.length;

    for (var i = 0; i < lenghtSpisok; i++) {
      switch (DateCount) {
        case "CommentCount":
          summ += spisok[i].commentCount;
          break;
        case "ViewsCount":
          summ += spisok[i].viewsCount;
          break;
        case "LikeCount":
          summ += spisok[i].likeCount;
          break;
        case "DizLikeCount":
          summ += spisok[i].dizLikeCount;
          break;
        case "Duration":
          summ += spisok[i].totalSeconds;
          break;
        default:
          console.error("Неизвестное значение переменной DateCount в методе getInfoForStatistic: ", DateCount);
      }
    }

    switch (AvgOrSumm) {
      case "Summ":
        result = summ;
        break;
      case "Avg":
        var avg = (summ / lenghtSpisok);
        result = avg.toFixed(3);
        break;
      default:
        console.error("Неизвестное значение переменной AvgOrSumm в методе getInfoForStatistic: ", AvgOrSumm);
    }

    if (DateCount == "Duration") {
      var day = 0;
      var minute = 0;
      var hour = 0;
      var secunde = 0;

      if (result >= 60) {
        minute = $scope.divide(result, 60);
        secunde = Math.round(Number((result % 60)));

        if (minute >= 60) {
          hour = $scope.divide(minute, 60);
          minute = minute % 60;

          if (hour >= 24) {
            day = $scope.divide(hour, 24);
            hour = hour % 24;
          }
        }
      }

      if (day > 0)
        result = (day + " " + getDeclinationOfTheWord("day", day) + ", " +
          hour + " " + getDeclinationOfTheWord("hour", hour) + ", " +
          minute + " " + getDeclinationOfTheWord("minute", minute) + ", " +
          secunde + " " + getDeclinationOfTheWord("second", secunde));
      else if (hour > 0)
        result = (hour + " " + getDeclinationOfTheWord("hour", hour) + ", " +
          minute + " " + getDeclinationOfTheWord("minute", minute) + ", " +
          secunde + " " + getDeclinationOfTheWord("second", secunde));
      else if (minute > 0)
        result = (minute + " " + getDeclinationOfTheWord("minute", minute) + ", " +
          secunde + " " + getDeclinationOfTheWord("second", secunde));
      else
        result = (secunde + " " + getDeclinationOfTheWord("second", secunde));
    }

    return result;
  }

  $scope.reloadPage = function() {
    var listSortedOne = $scope.cloneMassive($scope.infoListSortedOne);
    var listSortedTwo = $scope.cloneMassive($scope.infoListSortedTwo);

    if ($scope.getCountVideo(1) >= $scope.maxCountVideoOnPage || $scope.getCountVideo(2) >= $scope.maxCountVideoOnPage) {
      var endIndex = $scope.maxCountVideoOnPage * $scope.selectedPage;
      var startIndex = endIndex - $scope.maxCountVideoOnPage;

      $scope.showinfoListSortedOne = listSortedOne.splice(startIndex, $scope.maxCountVideoOnPage);
      $scope.showinfoListSortedTwo = listSortedTwo.splice(startIndex, $scope.maxCountVideoOnPage);
    } else {
      $scope.showinfoListSortedOne = $scope.infoListSortedOne;
      $scope.showinfoListSortedTwo = $scope.infoListSortedTwo;
    }

    $scope.textOutByListOne = $scope.getInfoForOutText(1);
    $scope.textOutByListTwo = $scope.getInfoForOutText(2);
  }

  $scope.getCountPage = function(listNumber) {
    var countPage = 1;

    switch (listNumber) {
      case 1:
        spisok = $scope.infoListSortedOne;
        break;
      case 2:
        spisok = $scope.infoListSortedTwo;
        break;
      default:
        console.error("Неизвестное значение переменной listNumber в методе getCountPage: ", listNumber);
    }

    var countVideos = $scope.getCountVideo(listNumber);

    if (countVideos >= $scope.maxCountVideoOnPage) {
      countPage = $scope.divide(countVideos, $scope.maxCountVideoOnPage)

      if ((countVideos % $scope.maxCountVideoOnPage) > 0)
        countPage += 1;
    }

    return countPage;
  }

  $scope.divide = function(a, b) {
    return (Math.floor(Number(a) / Number(b)));
  }

  $scope.toPage = function(goText) {
    Array.prototype.max = function() {
      return Math.max.apply(Math, this);
    }

    var maxCount = [$scope.getCountPage(1), $scope.getCountPage(2)].max();

    switch (goText) {
      case "Next":
        $scope.selectedPage += 1;

        if ($scope.selectedPage > maxCount)
          $scope.selectedPage = 1;

        break;
      case "Previous":
        $scope.selectedPage -= 1;

        if ($scope.selectedPage < 1)
          $scope.selectedPage = maxCount;
        break;
      default:
        {
          var pageNumber = Number(goText);

          if (pageNumber > 0 && pageNumber <= maxCount )
            $scope.selectedPage = pageNumber;
        }
    }

    $scope.reloadPage();
  }

  $scope.setSortMassive = function(typeSorted, listNumber) {

    switch (listNumber) {
      case 1:
        $scope.typeSortedListOne = typeSorted;
        break;
      case 2:
        $scope.typeSortedListTwo = typeSorted;
        break;
      default:
        console.error("Неизвестное значение переменной listNumber в методе setSortMassive: ", listNumber);
    }

    $scope.setMassive();
    $scope.reloadPage();
  }

  $scope.deleteItem = function (itemId, listNumber) {
    switch (listNumber) {
        case 1:
            $scope.infoListSortedOne = $scope.infoListSortedOne.filter(function(item) { return (item.objectId != itemId); });
            break;
        case 2:
            $scope.infoListSortedTwo = $scope.infoListSortedTwo.filter(function(item) { return (item.objectId != itemId); });
            break;
        default:
            console.error("Неизвестное значение переменной listNumber в методе deleteItem: ", listNumber);
    }

    $scope.reloadPage();
  }

  $scope.setMassive();
  $scope.reloadPage();
});
