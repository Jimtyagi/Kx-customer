import moment from "moment";

export default function() {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few secs",
      ss: "%d secs",
      m: "a min",
      mm: "%d mins",
      h: "an hour",
      hh: "%d hours",
      d: "1 day",
      dd: "%d days",
      M: "1 month",
      MM: "%d months",
      y: "1 year",
      yy: "%d years"
    }
  });
}

export const commentMoment = moment.defineLocale("en-comment", {
  parentLocale: "en",
  relativeTime: {
    past: "%s",
    s: "1s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy"
  }
});

export const postMoment = moment.defineLocale("en-post", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "just now",
    ss: "%d s",
    m: "a min",
    mm: "%d mins",
    h: "an hr",
    hh: "%d hrs",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});
