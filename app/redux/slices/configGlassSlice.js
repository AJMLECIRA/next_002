import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mirrorMaterial: 'glass',
  mirrorMaterialGroup: 'plain',
  mirrorMaterialCode: 'MX001',
  mirrorMaterialName: '',
  mirrorMaterialGauge: 4,
  mirrorMaterialEdge: 'polished',
  mirrorMaterialShape: 'regular',
  mirrorMaterialWidth: 800,
  mirrorMaterialHeight: 500,
  mirrorMaterialMin: 200,
  mirrorMaterialMax1: 1700,
  mirrorMaterialMax2: 2700,
  mirrorMaterialRad1: 50,
  mirrorMaterialRad2: 50,
  mirrorMaterialRad3: 50,
  mirrorMaterialRad4: 50,
  mirrorExtraScrews: 'none',
  mirrorExtraFittings: 'none',
  mirrorExtraAdhesive: 'none',
  mirrorExtraBacking: 'none',
  mirrorExtraSafety: 'none',
  mirrorExtraPremium: 'none',
  mirrorExtraFoil: 'none',
  mirrorExtraHeatpad: 'none',
  mirrorExtraSealant: 'none',
  mirrorExtraTape: 'none',

  tabIndex: 0,
  testInput: 100,

  selectedTintImgURL: '/images/glass/GX005.jpg', // Bronze
  selectedColRef: 'none',
  selectedColRefHL: 'none',
};

const configGlassSlice = createSlice({
  name: 'configGlass',
  initialState,
  // Use MM for MirrorMaterial and M for material FM for frame material etc
  reducers: {
    // set
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload;
    },
    setTestInput: (state, action) => {
      state.testInput = action.payload;
    },
    setMMGroup: (state, action) => {
      state.mirrorMaterialGroup = action.payload;
    },
    setMMCode: (state, action) => {
      state.mirrorMaterialCode = action.payload;
    },
    setMMName: (state, action) => {
      state.mirrorMaterialName = action.payload;
    },
    setMMEdge: (state, action) => {
      state.mirrorMaterialEdge = action.payload;
    },
    setMMGauge: (state, action) => {
      state.mirrorMaterialGauge = action.payload;
    },
    setBevelEdgeWidth: (state, action) => {
      state.bevelEdgeWidth = action.payload;
    },
    setMMShape: (state, action) => {
      state.mirrorMaterialShape = action.payload;
    },
    setMMWidth: (state, action) => {
      state.mirrorMaterialWidth = action.payload;
    },
    setMMHeight: (state, action) => {
      state.mirrorMaterialHeight = action.payload;
    },
    setMMMin: (state, action) => {
      state.mirrorMaterialMin = action.payload;
    },
    setMMMax1: (state, action) => {
      state.mirrorMaterialMax1 = action.payload;
    },
    setMMMax2: (state, action) => {
      state.mirrorMaterialMax2 = action.payload;
    },
    setMMRad1: (state, action) => {
      state.mirrorMaterialRad1 = action.payload;
    },
    setMMRad2: (state, action) => {
      state.mirrorMaterialRad2 = action.payload;
    },
    setMMRad3: (state, action) => {
      state.mirrorMaterialRad3 = action.payload;
    },
    setMMRad4: (state, action) => {
      state.mirrorMaterialRad4 = action.payload;
    },
    setMEScrews: (state, action) => {
      state.mirrorExtraScrews = action.payload;
    },
    setMEFittings: (state, action) => {
      state.mirrorExtraFittings = action.payload;
    },
    setMEAdhesive: (state, action) => {
      state.mirrorExtraAdhesive = action.payload;
    },
    setMEBacking: (state, action) => {
      state.mirrorExtraBacking = action.payload;
    },
    setMESafety: (state, action) => {
      state.mirrorExtraSafety = action.payload;
    },
    setMEPremium: (state, action) => {
      state.mirrorExtraPremium = action.payload;
    },
    setMEFoil: (state, action) => {
      state.mirrorExtraFoil = action.payload;
    },
    setMEHeatpad: (state, action) => {
      state.mirrorExtraHeatpad = action.payload;
    },
    setMESealant: (state, action) => {
      state.mirrorExtraSealant = action.payload;
    },
    setMETape: (state, action) => {
      state.mirrorExtraTape = action.payload;
    },
    setSelTintImg: (state, action) => {
      state.selectedTintImgURL = action.payload;
    },
    setColRef: (state, action) => {
      state.selectedColRef = action.payload;
    },
    setColRefHL: (state, action) => {
      state.selectedColRefHL = action.payload;
    },

    // reset Value
    resetMMGroup: (state) => {
      state.mirrorMaterialGroup = 'plain';
    },
    resetTestInput: (state, action) => {
      state.testInput = 100;
    },
    resetMMCode: (state) => {
      state.mirrorMaterialCode = 'MX001';
    },
    resetMMName: (state) => {
      state.mirrorMaterialName = '';
    },
    resetMMEdge: (state) => {
      state.mirrorMaterialEdge = 'polished';
    },
    resetMMGauge: (state) => {
      state.mirrorMaterialGauge = 4;
    },
    resetMMEdgeWidth: (state) => {
      state.mirrorMaterialEdgeWidth = 0;
    },
    resetMMShape: (state) => {
      state.mirrorMaterialShape = 'regular';
    },
    resetMMWidth: (state) => {
      state.mirrorMaterialWidth = 800;
    },
    resetMMHeight: (state) => {
      state.mirrorMaterialHeight = 500;
    },
    resetMMMin: (state) => {
      state.mirrorMaterialMin = 200;
    },
    resetMMMax1: (state) => {
      state.mirrorMaterialMax1 = 1700;
    },
    resetMMMax2: (state) => {
      state.mirrorMaterialMax2 = 2700;
    },
    resetMMRad1: (state) => {
      state.mirrorMaterialRad1 = 0;
    },
    resetMMRad2: (state) => {
      state.mirrorMaterialRad2 = 0;
    },
    resetMMRad3: (state) => {
      state.mirrorMaterialRad3 = 0;
    },
    resetMMRad4: (state) => {
      state.mirrorMaterialRad4 = 0;
    },
    resetMEScrews: (state) => {
      state.mirrorExtraScrews = 'none';
    },
    resetMEFittings: (state) => {
      state.mirrorExtraFittings = 'none';
    },
    resetMEAdhesive: (state) => {
      state.mirrorExtraAdhesive = 'none';
    },
    resetMEBacking: (state) => {
      state.mirrorExtraBacking = 'none';
    },
    resetMESafety: (state) => {
      state.mirrorExtraSafety = 'none';
    },
    resetMEPremium: (state) => {
      state.mirrorExtraPremium = 'none';
    },
    resetMEFoil: (state) => {
      state.mirrorExtraFoil = 'none';
    },
    resetMEHeatpad: (state) => {
      state.mirrorExtraHeatpad = 'none';
    },
    resetMESealant: (state) => {
      state.mirrorExtraSealant = 'none';
    },
    resetMETape: (state) => {
      state.mirrorExtraTape = 'none';
    },
    resetSelTintImg: (state) => {
      state.selectedTintImgURL =
        '/static/be37a7412367aa0f8791e761ee56d7b9/GX006.jpg';
    },
    resetColRef: (state) => {
      state.selectedColRef = 'none';
    },
    resetColRefHL: (state) => {
      state.selectedColRefHL = 'none';
    },
  },
});

export const {
  setTabIndex,
  setTestInput,
  setMMGroup,
  setMMCode,
  setMMName,
  setMMGauge,
  setMMEdge,
  setBevelEdgeWidth,
  setMMShape,
  setMMWidth,
  setMMHeight,
  setMMMin,
  setMMMax1,
  setMMMax2,
  setMMRad1,
  setMMRad2,
  setMMRad3,
  setMMRad4,
  setMEScrews,
  setMEFittings,
  setMEAdhesive,
  setMEBacking,
  setMESafety,
  setMEPremium,
  setMEFoil,
  setMEHeatpad,
  setMESealant,
  setMETape,
  setSelTintImg,
  setColRef,
  setColRefHL,
  // Resets
  resetTestInput,
  resetMMEdge,
  resetMMGroup,
  resetMMCode,
  resetMMName,
  resetMMGauge,
  resetMMEdgeWidth,
  resetMMShape,
  resetMMWidth,
  resetMMHeight,
  resetMMMin,
  resetMMMax1,
  resetMMMax2,
  resetMMRad1,
  resetMMRad2,
  resetMMRad3,
  resetMMRad4,
  resetMEScrews,
  resetMEFittings,
  resetMEAdhesive,
  resetMEBacking,
  resetMESafety,
  resetMEPremium,
  resetMEFoil,
  resetMEHeatpad,
  resetMESealant,
  resetMETape,
  resetSelTintImg,
  resetColRef,
  resetColRefHL,
} = configGlassSlice.actions;

export default configGlassSlice.reducer;
