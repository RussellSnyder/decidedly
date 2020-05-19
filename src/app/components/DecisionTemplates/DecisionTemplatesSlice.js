import { createSlice } from '@reduxjs/toolkit';
import { getNextId } from '../../utils/getNextId';

export const decisionTemplatesInitialState = {
  1: {
    name: "Software Job Hunt",
    author: "Russell Snyder",
    date: "20200518",
    description: "Looking for a new job? Using these weighting options are scientifically sound to ensure your happiness",
    userWeights: {
      1: {
        name: "People - Peers",
        description: "How well do you see your co-workers contributing to your job satisfaction?",
        value: 6
      },
      2: {
        name: "People - Manager",
        description: "Are there people who can help you grow and resolve conflicts when they arise?",
        value: 8
      },
      3: {
        name: "Product - Quality",
        description: "How well made is the product you will be working with?",
        value: 8
      },
      4: {
        name: "Family Friendly",
        description: "If you have an emergency, can you leave work without much kickback?",
        value: 8
      },
    }
  },
  2: {
    name: "City Decider",
    author: "Russell Snyder",
    date: "20200517",
    description: "There are some cities that I'd like to live in, but I can't decide which one!",
    userWeights: {
      1: {
        name: "Food",
        description: "What restaurants are there?",
        value: 6
      },
      2: {
        name: "Music",
        description: "What music exists? Do big name artists pass through?",
        value: 8
      },
      3: {
        name: "Safety",
        description: "How likely am I to get shot here?",
        value: 10
      },
    }
  },
  3: {
    name: "Baby Names",
    author: "Russell Snyder",
    date: "20200517",
    description: "Some important factors when deciding on your baby's name",
    userWeights: {
      1: {
        name: "Tradition",
        description: "How well does this follow my religious or cultural tradition",
        value: 6
      },
      2: {
        name: "Spellability",
        description: "Spelling stuff is important",
        value: 5
      },
      3: {
        name: "Shoutability",
        description: "They might be far away at some point",
        value: 10
      },
      4: {
        name: "Respectability",
        description: "Is this something they would want to be called?",
        value: 4
      },
    }
  },
  4: {
    name: "Sleep Schedule",
    author: "Russell Snyder",
    date: "20200517",
    description: "When should I got to bed, when should I wake up?",
    userWeights: {
      1: {
        name: "Needed Energy Level",
        description: "Maybe i can be tired all the time",
        value: 10
      },
    }
  },
  5: {
    name: "Music Group",
    author: "Russell Snyder",
    date: "20200517",
    description: "Should you play in this band?",
    userWeights: {
      1: {
        name: "Money",
        description: "You probably need money",
        value: 5
      },
      2: {
        name: "Music",
        description: "This is the music that is calling to you!",
        value: 10
      },
      3: {
        name: "Musicians",
        description: "You believe in your band mates and think they are awesome people",
        value: 10
      },
    }
  },
};

export const decisionTemplateInitialState = {
  name: "Empty Decision Template",
  author: "You!",
  date: "20200518",
  description: "Super awesome template for that thing",
  userWeights: {},
  optionCollection: {},
}

export const decisionTemplatesSlice = createSlice({
  name: 'decisionTemplates',
  initialState: decisionTemplatesInitialState,
  reducers: {
    createDecisionTemplate(state) {
      const id = getNextId(state);
      const newTemplate = {
        ...decisionTemplateInitialState,
        name: `Decision Template ${id}`,
      }

      state[id] = newTemplate
    },

    updateDecisionTemplate(state, action) {
      let { decisionTemplateId, name, author, date, description } = action.payload

      if (name) state[decisionTemplateId].name = name
      if (author) state[decisionTemplateId].author = author
      if (date) state[decisionTemplateId].date = date
      if (description) state[decisionTemplateId].description = description
    },

    deleteDecisionTemplate(state, action) {
      let { decisionTemplateId } = action.payload

      delete state[decisionTemplateId]
    },

    addDecisionTemplateUserWeight(state, action) {
      const { decisionTemplateId } = action.payload;
      let { name, value, description } = action.payload

      const userWeights = selectUserWeights(state, decisionTemplateId)
      
      const newUserWeightId = getNextId(userWeights);

      userWeights[newUserWeightId] = { name, value, description }
    },

    updateDecisionTemplateUserWeight(state, action) {
      const { decisionTemplateId, userWeightId, name, value, description } = action.payload;

      const userWeight = selectUserWeight(state, decisionTemplateId, userWeightId)

      if (value !== undefined) userWeight.value = value
      if (name) userWeight.name = name
      if (description) userWeight.description = description
    },

    deleteDecisionTemplateUserWeight(state, action) {
      const { decisionTemplateId, userWeightId } = action.payload;

      const userWeights = selectUserWeights(state, decisionTemplateId)
      delete userWeights[userWeightId]      
    },
  },
});

export const {
  createDecisionTemplate,
  deleteDecisionTemplate,
  updateDecisionTemplate,
  addDecisionTemplateUserWeight,
  updateDecisionTemplateUserWeight,
  deleteDecisionTemplateUserWeight,
} = decisionTemplatesSlice.actions;

export const selectDecisionTemplates = state => state.decisionTemplates;
export const selectDecisionTemplate = (state, id) => state[id]
export const selectUserWeights = (state, id) => selectDecisionTemplate(state, id).userWeights
export const selectUserWeight = (state, id, weightId) => selectUserWeights(state, id)[weightId]

export default decisionTemplatesSlice.reducer;