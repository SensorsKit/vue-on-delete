<script>
export default {
  template: `
    <div>
      <input type="text" v-on-delete="onDelete">
      <p>你刚刚删除了 {{count}} 次。</p>
    </div>
  `,

  data() {
    return {
      count: 0
    }
  },

  methods: {
    onDelete() {
      this.count++
    }
  }
}
</script>

<style scoped>
input {
  appearance: none;
  width: 500px;
  height: 22px;
  max-width: 100vw;
  display: block;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  padding: 10px 40px 10px 10px;
  color: #333;
  font-size: 16px;
  transition: all 0.25s;
}

input:active,
input:focus {
  outline: none;
  border-color: #fd6853;
}
</style>

