# ⏰ Timeline Slider Feature - Demo Guide

## What's New

The Mercy app now has an interactive timeline to filter historical events by date!

## ✨ Key Features

### 1. **Smart Layer Detection**
- **Automatically hidden** for Jesus layer (events span only ~40 years)
- **Dynamic date ranges** based on data:
  - **Marian Apparitions**: AD 40 - 2030  
  - **Mass Origins**: AD 30 - 500
  - **Spread of Christianity**: AD 30 - 2030

### 2. **Dual-Range Slider**
- **Drag both handles** to set min/max years
- **Visual timeline markers** show major centuries/decades
- **Real-time filtering** as you drag

### 3. **Auto-Play Animation**
- **▶ Play button** to watch history unfold chronologically
- **Speed controls**: 0.5x, 1x, 2x, 3x
- **Expanding time window** shows progression over time
- **Smart window sizing** based on data density

### 4. **Interactive Controls**
- **Reset button** → Show all events
- **Event counter** → "X of Y events" 
- **Year formatting** → "AD 40", "1858", etc.

## 🎯 How to Use

### Marian Apparitions
1. **Switch to Marian layer**
2. **Drag timeline** to focus on specific centuries:
   - Early Church: AD 40 - 400
   - Medieval period: 1000 - 1400  
   - Modern apparitions: 1800 - present
3. **Hit Play** to watch apparitions appear chronologically

### Spread of Christianity  
1. **Switch to Spread layer**
2. **Use Play button** for epic historical progression:
   - Apostolic Age (30-100 AD)
   - Roman Empire (100-400 AD) 
   - Medieval expansion (400-1000 AD)
   - Age of exploration (1400-1700 AD)
   - Modern missions (1700-present)

### Mass Origins
1. **Switch to Mass layer** 
2. **Timeline shows** liturgical development
3. **Filter by periods** to see specific developments

## 🎨 Visual Design

- **Glassmorphism** panel matching app theme
- **Dual blue handles** for precise range selection
- **Highlighted track** shows active time range
- **Responsive** → Adapts to mobile screens
- **Smooth animations** → No jarring transitions

## 🔧 Technical Magic

- **Year extraction** from multiple data formats
- **Smart stepping** → Different granularity per layer
- **Performance optimized** → useMemo for expensive filtering
- **Accessibility** → Keyboard navigation, focus styles
- **Auto-reset** → Timeline clears when switching layers

## 📊 Impact

Transforms the app from static exploration to **dynamic historical storytelling**. Watch 2000 years of Christianity spread across the globe in real-time! 🐧

Perfect for:
- **Educational presentations**
- **Historical research** 
- **Timeline-based exploration**
- **Understanding chronological patterns**

The timeline makes your rich historical data come alive! ⏰✨