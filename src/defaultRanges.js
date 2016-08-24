export default {
  'Today': {
    startDate: (now) => {
      return now;
    },
    endDate: (now) => {
      return now;
    }
  },

  'Yesterday': {
    startDate: (now) => {
      return now.add(-1, 'days');
    },
    endDate: (now) => {
      return now.add(-1, 'days');
    }
  },

  'Last 7 Days': {
    startDate: (now) => {
      return now.add(-7, 'days');
    },
    endDate: (now) => {
      return now;
    }
  },

  'Last 30 Days': {
    startDate: (now) => {
      return now.add(-30, 'days');
    },
    endDate: (now) => {
      return now;
    }
  },

  'Last month': {
    startDate: (now) => {
      return now.startOf('month').add(-1, 'month');
    },
    endDate: (now) => {
      return now.startOf('month').add(-1, 'day');
    }
  },

  'This month': {
    startDate: (now) => {
      return now.startOf('month');
    },
    endDate: (now) => {
      return now;
    }
  }
}